'''
Document: File for converting local .xlsx file (Microsoft Excel) to .json format for dynamic reading into HTML page
Author: Rich Gude
Version: 1.0, dated 14 DEC 2021
'''

# Load Libraries
import pandas as pd
import json
import os

# Prepare a list of the name of appropriate sheet names
sheet_list = ['Ongoing Ops', 'Upcoming Ops', 'Tech Ops Stats', 'Completed Ops']

# Read each sheet into a json file with the appropriate name
for i, name in enumerate(sheet_list):
    pd.read_excel('Data.xlsx', sheet_name=i).to_json(os.path.join('javascript', name + '.json'), orient='index')