# -*- coding:utf-8 -*-
import sys
reload(sys)
sys.setdefaultencoding('utf-8')
import time
import xlrd
from collections import OrderedDict
import json
import codecs
import os


def get_file(dir):
    file_list = []
    for file in os.listdir(dir):
        file_name = os.path.join(dir, file)
        if os.path.isfile(file_name) and os.path.splitext(file_name)[1] in ['.xlsx'] :
            file_list.append(file_name)
    return file_list


def to_json(file):
    # print file
    wb = xlrd.open_workbook(file)

    convert_list = {}
    sh = wb.sheet_by_index(0)
    title = sh.row_values(2)
    type = sh.row_values(1)
    for rownum in range(4, sh.nrows):
        rowvalue = sh.row_values(rownum)
        if rowvalue[0] == "":
            continue
        single = OrderedDict()
        for colnum in range(0, len(rowvalue)):
            if rowvalue[colnum] == "":
                single[title[colnum]] = ""
            elif type[colnum] == "string":
                single[title[colnum]] = str(rowvalue[colnum])
            elif type[colnum] == "int":
                single[title[colnum]] = int(rowvalue[colnum])
            elif type[colnum] == "bool":
                single[title[colnum]] = int(rowvalue[colnum])
            elif type[colnum] == "":
                continue
            elif type[colnum] == "int[]":
                if str.find(str(rowvalue[colnum]),',') != -1:
                    single[title[colnum]] = rowvalue[colnum].split(",",-1)
                else:
                    arr = []
                    arr.append(int(rowvalue[colnum]))
                    single[title[colnum]] = arr
            else:
                # print type[colnum]
                sys.exit()

        if type[0] == 'int':
            convert_list[int(rowvalue[0])] = (single)
        else:
            convert_list[str(rowvalue[0])] = (single)

    j = json.dumps(convert_list,indent=1).decode("unicode-escape")

    file_name = os.path.split(file)[1]
    new_file = "./json/" + os.path.splitext(file_name)[0] + ".json"

    with codecs.open(new_file, "w", "utf-8") as f:
        f.write(j)
    print new_file


file_list = get_file("./xlsx")
for file in file_list:
    to_json(file)
time.sleep(1)