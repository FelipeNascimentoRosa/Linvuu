# Como não perder o site

O site são quatro coisas guardadas em lugares diferentes. Cada uma tem seu risco.

1. **Código e aulas (GitHub).** Já está seguro de falha do computador: o GitHub tem a cópia, e a pasta no seu VS Code é outra cópia completa.
   - Ative verificação em duas etapas na conta do GitHub e guarde os códigos de recuperação.
   - Convide a Luiza como segunda dona do repositório.
   - Em Settings → Branches, proteja a `main` (exigir pull request). Evita apagar ou sobrescrever por engano.
   - Uma vez por mês: `git clone --mirror https://github.com/FelipeNascimentoRosa/Linvuu.git` e guarde a pasta num HD externo ou no Drive. É uma cópia que não depende do GitHub.
2. **Site no ar (Render).** Não é backup: é só uma cópia em execução. Se sumir, você recria o serviço a partir do GitHub em minutos, desde que tenha as variáveis de ambiente. Guarde uma cópia delas (Render e Firebase) num gerenciador de senhas.
3. **Dados dos alunos (Firebase).** Não ficam no GitHub. Para backup, use a exportação do Firestore (a exportação agendada exige plano pago do Firebase; confira o custo na documentação) ou exporte manualmente antes de mudanças grandes. Faça isso antes de abrir vendas.
4. **Domínio (Registro.br) e e-mail.** Sem o domínio o site some mesmo com tudo no GitHub. Ative a verificação em duas etapas, mantenha o e-mail de contato atualizado e anote a data de renovação.
5. **Áudios gravados (quando existirem).** Guarde os arquivos originais em dois lugares (nuvem e HD externo). O repositório só guarda a lista do que gravar.

Regra de ouro: o que o Claude cria numa conversa só está salvo se foi enviado ao GitHub. O ambiente do Claude é temporário.

Tokens do GitHub: crie com validade curta, só para o repositório, e revogue depois de usar.
