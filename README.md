# Bat Sinal

Este é um aplicativo React Native feito com Expo para acionar o Bat Sinal e chamar o Batman para ajudar na sua localização!

## Funcionalidades

- Animação do Bat Sinal ao iniciar o chamado
- Formulário para informar nome, contato, observação e localização atual (usando GPS)
- Permissão e exibição automática do endereço
- Interface amigável e responsiva

## Como rodar

1. Instale as dependências:
   ```sh
   npm install
   ```
2. Inicie o projeto:
   ```sh
   npm start
   ```
3. Escolha rodar no Android, iOS ou Web conforme desejar.

## Estrutura

- `App.tsx`: Componente principal do app
- `src/screens/Home/Home.tsx`: Tela principal com animação e formulário
- `App.styles.tsx`: Estilos globais
- `assets/`: Imagens do projeto

## Requisitos

- Node.js
- Expo CLI (`npm install -g expo-cli`)

## Observações

- O app solicita permissão de localização ao abrir.
- Os dados do formulário são exibidos em um alerta ao enviar.

---

Feito com ❤️ para chamar o Batman!