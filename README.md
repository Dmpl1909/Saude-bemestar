# Saúde e Bem-Estar

Aplicativo React Native para rastrear hábitos saudáveis, incluindo consumo de água, horas de sono e exercícios físicos.

## 📱 Funcionalidades

- **Rastreamento de Água**: Monitore quantos copos de água você bebe por dia
- **Horas de Sono**: Registre suas horas de sono e veja a qualidade do seu descanso
- **Exercícios Físicos**: Adicione e gerencie suas atividades físicas diárias
- **Armazenamento Local**: Todos os dados são salvos localmente no dispositivo
- **Interface Intuitiva**: Design limpo e fácil de usar com ícones visuais

## 🚀 Tecnologias

- React Native
- Expo SDK
- React Navigation
- AsyncStorage
- Expo Vector Icons

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Expo CLI
- Expo Go app (para testar no celular)

## 🔧 Instalação

1. Clone o repositório ou navegue até a pasta do projeto:
```bash
cd Saude-bemestar
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o projeto:
```bash
npm start
```

## 📱 Como Executar

### No Celular (Recomendado)

1. Instale o aplicativo **Expo Go** na Play Store (Android) ou App Store (iOS)
2. Execute `npm start` no terminal
3. Escaneie o QR Code que aparece no terminal ou navegador com o Expo Go
4. O aplicativo será carregado no seu celular

### No Emulador Android

```bash
npm run android
```

### No Simulador iOS (somente macOS)

```bash
npm run ios
```

### No Navegador Web

```bash
npm run web
```

## 📖 Como Usar

1. **Tela Principal**: Visualize o resumo de todos os seus hábitos do dia
2. **Consumo de Água**: Toque no card de água para adicionar ou remover copos
3. **Horas de Sono**: Registre quantas horas você dormiu
4. **Exercícios**: Adicione exercícios com nome e duração

## 🗂️ Estrutura do Projeto

```
Saude-bemestar/
├── src/
│   ├── components/
│   │   └── HabitCard.js
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── WaterScreen.js
│   │   ├── SleepScreen.js
│   │   └── ExerciseScreen.js
│   └── utils/
│       └── storage.js
├── assets/
├── App.js
├── app.json
└── package.json
```

## 🎨 Características

- Interface moderna e responsiva
- Feedback visual com ícones coloridos
- Animações suaves
- Armazenamento persistente de dados
- Sistema de metas e progresso
- Design adaptado para iOS e Android

## 📝 Licença

Este projeto é de código aberto e está disponível para uso educacional.

## 👨‍💻 Desenvolvimento

Desenvolvido com React Native e Expo em JavaScript.
