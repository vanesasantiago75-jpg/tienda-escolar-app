from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model, authenticate

User = get_user_model()


class RegisterView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response(
                {'error': 'Faltan campos'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(username=username).exists():
            return Response(
                {'error': 'El usuario ya existe'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = User.objects.create_user(
            username=username,
            password=password
        )

        return Response(
            {'message': 'Usuario creado con éxito'},
            status=status.HTTP_201_CREATED
        )


class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user is not None:
            return Response(
                {'message': 'Login exitoso'},
                status=status.HTTP_200_OK
            )

        return Response(
            {'error': 'Credenciales inválidas'},
            status=status.HTTP_400_BAD_REQUEST
        )

