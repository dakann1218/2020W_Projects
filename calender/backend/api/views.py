from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
import json

import datetime

from .models import Todo

@ensure_csrf_cookie
def checkIntegration(request):
    return HttpResponse('Hello, world!')

@ensure_csrf_cookie
def saveTodo(request):  #recieve year, month, date, title, content
    if request.method == 'POST':
        body = json.loads(request.body.decode())
        year = body['year']
        month = body['month']
        date = body['date']
        title = body['title']
        content = body['content']
        
        newtodo = Todo(year = year, month = month, date = date, title = title, content = content)
        newtodo.save()
        print(Todo.objects.all())
        return HttpResponse(status=201)
    
    elif request.method == 'PUT':
        return HttpResponse(status=202)

    else:
        return HttpResponseNotAllowed(['POST','PUT'])


@ensure_csrf_cookie
def sendTodos(request):
    if request.method == 'POST':
        body = json.loads(request.body.decode())
        year = body['year']
        month = body['month']
        
        #In every objects in Todo model with year, month -> send list of (date, title, content)
        title_list = {}
        for item in Todo.objects.all():
            if item.year == year:
                if item.month == month:
                    if (item.date in title_list): #if date already exists in title_list(dictionary)
                        title_list[item.date].append([item.id, item.title])
                    else:
                        title_list[item.date] = [[item.id, item.title]]
        
        return JsonResponse({ 'titles': title_list }, status=201)
    else:
        return HttpResponseNotAllowed(['POST'])
   
def sendContent(request, id = 0):
    if request.method == 'GET':
        todo = Todo.objects.get(id = id)
        return JsonResponse({'title': todo.title, 'content': todo.content},status = 201)
    else:
        return HttpResponseNotAllowed(['GET'])

def deleteContent(request, id = 0):
    if request.method == 'DELETE':
        todo = Todo.objects.get(id = id)
        todo.delete()
        return HttpResponse(status = 201)
    else:
        return HttpResponseNotAllowed(['DELETE'])

def modifyContent(request, id = 0):
    if request.method == 'POST':
        todo = Todo.objects.get(id = id)
        body = json.loads(request.body.decode())
        title = body['title']
        content = body['content']
        todo.title = title;
        todo.content = content;
        todo.save()
        return HttpResponse(status = 201)

    else:
        return HttpResponseNotAllowed(['POST'])

def sendMonth(request):
    if request.method == 'GET':
        month = datetime.datetime.now().month
        return JsonResponse({'month': month},status = 201)



