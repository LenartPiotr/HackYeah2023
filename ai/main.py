from flask import Flask, request
import torch
import os, json, time, sys
from codellama.llama import Llama
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

model = None

translator_tokenizer = AutoTokenizer.from_pretrained("Helsinki-NLP/opus-mt-pl-en")
translator = AutoModelForSeq2SeqLM.from_pretrained("Helsinki-NLP/opus-mt-pl-en", device_map=0)

app = Flask(__name__)

database_description = ''

last_prompts = []   
last_temperature = 0.2
last_top_p = 0.95

def translate(text):
    tokens = translator_tokenizer(text, return_tensors='pt').input_ids.cuda()
    outputs = translator.generate(tokens)
    return translator_tokenizer.decode(outputs[0])[1:-1]


@app.get('/')
def get_sql_statement():
    global last_prompts, last_temperature, last_top_p
    input_text = request.args.get("input")
    lang = request.args.get("lang")
    temperature = request.args.get("temperature")
    top_p = request.args.get("top_p")
    if input_text is None:
        return "error"
    
    if lang is not None and lang == 'pl':
        input_text = translate(input_text)

    if temperature is None:
        temperature = 0.2
    else:
        temperature = float(temperature)
    if top_p is None:
        top_p = 0.95
    else:
        top_p = float(top_p)

    prompt = database_description+'\n'+'Write an sql statement that satisfies the following description: '+input_text

    instructions = [
        {
            'role': 'system',
            'content': 'Answer in SQL statements only'
        },
        {
            'role': 'user',
            'content': prompt
        }
    ]

    last_prompts = instructions.copy()

    results = model.chat_completion(
        [instructions],
        max_gen_len=3000,
        temperature=temperature,
        top_p=top_p
    )
    output = results[0]['generation']['content']

    last_prompts.append({
        'role': 'assistant',
        'content': output
    })

    return output

@app.get('/followup/')
def followup():
    global last_prompts, last_temperature, last_top_p
    if len(last_prompts) == 0:
        return 'error'
    input_text = request.args.get("input")
    lang = request.args.get("lang")
    temperature = request.args.get("temperature")
    top_p = request.args.get("top_p")
    if input_text is None:
        return "error"
    
    if lang is not None and lang == 'pl':
        input_text = translate(input_text)

    if temperature is None:
        temperature = last_temperature
    else:
        temperature = float(temperature)
    if top_p is None:
        top_p = last_top_p
    else:
        top_p = float(top_p)
    
    instructions = last_prompts.copy()
    instructions.append({
        'role': 'user',
        'content': input_text
    })

    results = model.chat_completion(
        [instructions],
        max_gen_len=3000,
        temperature=temperature,
        top_p=top_p
    )
    output = results[0]['generation']['content']

    last_prompts = instructions.copy()
    last_prompts.append({
        'role': 'assistant',
        'content': output
    })

    return output

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print('Error: not enough arguments')
    description_path = sys.argv[1]
    with open(description_path) as f:
        description = f.read()
    
    model_path = sys.argv[2]

    model = Llama.build(ckpt_dir=model_path,
    tokenizer_path=os.path.join(model_path, 'tokenizer.model'),
    max_seq_len=2000, max_batch_size=1)

    app.run()