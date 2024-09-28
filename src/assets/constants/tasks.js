const TASKS = [
  {
    id: 1,
    title: 'Escrever documentação',
    description: 'Finalizar a documentação técnica do projeto.',
    time: 'morning',
    status: 'in_progress',
  },
  {
    id: 2,
    title: 'Reunião com cliente',
    description: 'Discutir os requisitos finais do projeto com o cliente.',
    time: 'afternoon',
    status: 'in_progress',
  },

  {
    id: 3,
    title: 'Implementar login',
    description: 'Desenvolver a funcionalidade de login para usuários.',
    time: 'morning',
    status: 'not_started',
  },
  {
    id: 4,
    title: 'Criar layout da página',
    description: 'Desenvolver o layout da página inicial do sistema.',
    time: 'evening',
    status: 'not_started',
  },

  {
    id: 5,
    title: 'Configurar ambiente de desenvolvimento',
    description: 'Ambiente local de desenvolvimento configurado corretamente.',
    time: 'morning',
    status: 'done',
  },
  {
    id: 6,
    title: 'Correção de bugs',
    description: 'Resolver os bugs encontrados no módulo de pagamento.',
    time: 'afternoon',
    status: 'done',
  },
];

export default TASKS;
