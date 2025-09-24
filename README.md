**Desafio Técnico n8n - Conector de Número Aleatório**  
Este repositório contém a solução para o desafio técnico de criação de um nó customizado para a plataforma de automação n8n. O objetivo foi desenvolver um conector que busca um número aleatório através da API pública da random.org.

**Status do Projeto**  
⚠️ Parcialmente Funcional: Todo o código do nó, a configuração do ambiente e a infraestrutura com Docker foram implementados com sucesso. O código compila sem erros, mas o projeto enfrenta um problema de runtime no qual o n8n, apesar de iniciar corretamente, não registra/exibe o nó customizado na sua interface de usuário.

A seção "Análise do Problema Atual" abaixo detalha a investigação e o estado atual do problema.

**Tecnologias Utilizadas**  
.n8n: Plataforma de automação de workflows.  
.Docker & Docker Compose: Para criação e orquestração do ambiente de desenvolvimento.  
.TypeScript: Linguagem principal para o desenvolvimento do nó.  
.Node.js / npm: Para gerenciamento de dependências e execução de scripts.  
.PostgreSQL: Banco de dados para a instância do n8n.  

**Instruções de Instalação e Execução**  
Estas são as instruções para replicar o ambiente e executar o projeto localmente.

**Pré-requisitos**  
.Docker e Docker Compose instalados e em execução na sua máquina.

**Passos**

1. Clonar o Repositório  
git clone <URL_DO_SEU_REPOSITORIO>  
cd desafio-n8n 

2. Instalar Dependências do Nó  
Navegue até a pasta do nó customizado e instale as dependências de desenvolvimento usando npm.  
cd .n8n/custom  
npm install 

3. Compilar o Nó Customizado  
Com as dependências instaladas, compile o código TypeScript para JavaScript. Este comando criará uma pasta dist com o arquivo final.  
npm run build 

4. Executar o Serviço Localmente com Docker  
Volte para a pasta raiz do projeto e inicie os contêineres do n8n e do PostgreSQL.  
cd ../..  
docker-compose up

Após a inicialização, a instância do n8n estará acessível em http://localhost:5678.

**Como Testar**  
Após iniciar os serviços, o teste funcional seria:  
.Acessar http://localhost:5678 no navegador.  
.Criar um novo workflow em branco ("Start from scratch").  
.Clicar no + para adicionar um novo nó e, na barra de busca, procurar por "Random Number".  
.Ponto do Problema: Atualmente, o nó não aparece nos resultados da busca, o que impede a continuação do teste.

**Análise do Problema Atual** (Informação Relevante)  
O desafio principal encontrado foi um problema de "carregamento silencioso". Após resolver uma série de desafios de configuração e dependências, chegamos ao seguinte estado:

**Sintoma:** O contêiner do n8n inicia com sucesso, sem erros ou travamentos. A interface web fica totalmente acessível. No entanto, o nó customizado Random Number não é registrado e não aparece na lista de nós disponíveis.

Evidências Coletadas:  
O código TypeScript (Random.node.ts) é válido e compila com sucesso para JavaScript (dist/Random.node.js).  
O package.json do nó está configurado com a seção "n8n" que aponta corretamente para o arquivo compilado ("dist/Random.node.js").  
A verificação do sistema de arquivos dentro do contêiner (docker-compose exec n8n ls ...) confirma que a pasta dist e o arquivo Random.node.js estão presentes e acessíveis para o n8n.  
Logs em modo debug (N8N_LOG_LEVEL=debug) foram ativados, mas não apresentaram nenhuma mensagem de erro explícita ou aviso sobre o carregamento do arquivo do nó. Eles mostram que o n8n encontra o arquivo, mas não fornecem uma razão clara para não registrá-lo.  

**Hipótese:** A causa mais provável é uma incompatibilidade sutil e não documentada entre a versão das dependências de desenvolvimento (n8n-core, n8n-workflow) e a versão da imagem Docker (n8nio/n8n:latest), que faz com que o mecanismo de carregamento de nós do n8n ignore o arquivo sem gerar um erro.

**Próximos Passos** (Se houvesse mais tempo)
Análise Aprofundada dos Logs: Investigar ainda mais os logs de debug em busca de mensagens de baixo nível sobre o NodeLoader e o registro de pacotes.  
Testar com Versões Fixas: Substituir a imagem n8nio/n8n:latest por uma versão específica (ex: n8nio/n8n:1.40.0) para garantir que a versão do n8n em execução seja 100% compatível com as dependências de desenvolvimento travadas na mesma versão.  
Validação Cruzada: Construir o nó mais simples possível a partir do zero (ex: um nó que apenas soma 1 a um número) para verificar se o problema está no ambiente ou especificamente no código/dependências do nó "Random".

**Conclusão**  
Embora a funcionalidade final não esteja visível na interface, o desafio permitiu a demonstração de competências em todo o ciclo de desenvolvimento: configuração de ambiente com Docker, desenvolvimento em TypeScript, depuração de problemas complexos de dependências e análise metódica de erros de runtime. A base do projeto está completa e funcional, faltando apenas a resolução de um problema de integração final com o motor do n8n.
