# HairDay

Agendamento de cortes de cabelo com React, TypeScript e Tailwind CSS.

## Funcionalidades

- Agendar um atendimento escolhendo **data**, **horário** e **nome do cliente**
- Horários fixos por período: **Manhã** (09h–12h), **Tarde** (13h–18h) e **Noite** (19h–21h)
- Horários já ocupados ou que já passaram ficam indisponíveis
- Agenda do dia agrupada por período, com navegação por data
- Cancelamento de agendamento (com confirmação)
- Dados salvos no `localStorage` e sincronizados entre abas
- Tema claro e escuro (botão no canto superior esquerdo); segue o sistema por padrão e lembra a escolha

## Requisitos

- Node.js **20.19+** ou **22.12+** (exigência do Vite 7)

## Scripts

```bash
npm install
npm run dev         # servidor de desenvolvimento
npm run build       # type-check + build de produção
npm run preview     # serve o build
npm run lint        # ESLint
npm test            # testes unitários (Vitest)
npm run test:watch  # testes em modo watch
```

## Estrutura

```
src/
├── App.tsx                     # Provider + layout
├── context/                    # Estado global (AppointmentsProvider)
├── hooks/useAppointments.ts    # Acesso ao contexto
├── components/
│   ├── brand/                  # Logo
│   ├── layout/                 # HairDayLayout, BookingPanel
│   ├── booking/                # Formulário de agendamento
│   ├── schedule/               # Agenda (Schedule, PeriodSection, ...)
│   └── ui/                     # Componentes genéricos (FormMessage)
├── types/appointment.ts        # Appointment, Period, PeriodId
└── utils/
    ├── appointment.ts          # Regras de negócio (períodos, disponibilidade)
    ├── date.ts                 # Datas no fuso local
    └── storage.ts              # Persistência no localStorage
```

## Decisões

- **Datas no fuso local**: datas são strings `YYYY-MM-DD` geradas com
  `getFullYear/getMonth/getDate`. `toISOString()` e `new Date("YYYY-MM-DD")`
  usam UTC e deslocam o dia no Brasil.
- **Fonte única dos períodos**: `PERIODS` em `utils/appointment.ts`; mudar
  horários de atendimento é editar só essa constante.
- **Validação no provider**: `addAppointment` valida nome, data, horário,
  conflitos e horários passados, e devolve `{ ok, error }` para o formulário.
