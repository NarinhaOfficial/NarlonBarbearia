// Substitua COM AS SUAS INFORMAÇÕES REAIS DO SUPABASE!
const SUPABASE_URL = 'https://ywhotfyitzortwouyzmr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3aG90ZnlpdHpvcnR3b3V5em1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyOTA4NTQsImV4cCI6MjA2Njg2Njg1NH0.9vTzeWc6V-odboJfvLqptgHiJpInLAsxRXVqj5RNbWw';



const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- Cadastro ---
const cadastroForm = document.getElementById('cadastroForm');
if (cadastroForm) {
    const emailInputCadastro = document.getElementById('email');
    const passwordInputCadastro = document.getElementById('password');
    const mensagemElementCadastro = document.getElementById('mensagem');

    cadastroForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = emailInputCadastro.value;
        const password = passwordInputCadastro.value;

        if (!email || !password) {
            mensagemElementCadastro.textContent = 'Preencha todos os campos.';
            mensagemElementCadastro.style.color = 'red';
            return;
        }

        mensagemElementCadastro.textContent = 'Cadastrando...';

        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) {
            mensagemElementCadastro.textContent = `Erro: ${error.message}`;
            mensagemElementCadastro.style.color = 'red';
        } else {
            mensagemElementCadastro.textContent = 'Cadastro realizado! Verifique seu e-mail.';
            mensagemElementCadastro.style.color = 'green';
            cadastroForm.reset();
        }
    });
}

// --- Login ---
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    const loginEmailInput = document.getElementById('loginEmail');
    const loginPasswordInput = document.getElementById('loginPassword');
    const mensagemLoginElement = document.getElementById('mensagemLogin');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = loginEmailInput.value;
        const password = loginPasswordInput.value;

        mensagemLoginElement.textContent = 'Autenticando...';

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            mensagemLoginElement.textContent = `Erro no login: ${error.message}`;
            mensagemLoginElement.style.color = 'red';
        } else if (data.user && !data.user.confirmed_at) {
            mensagemLoginElement.textContent = 'Confirme seu e-mail antes de fazer login.';
            mensagemLoginElement.style.color = 'orange';
        } else {
            mensagemLoginElement.textContent = 'Login realizado com sucesso! Redirecionando...';
            mensagemLoginElement.style.color = 'green';
            loginForm.reset();

            setTimeout(() => {
                window.location.href = 'agendamento/agendamento.html';
            }, 1500);
        }
    });
}


// ... (código do Supabase URL/KEY, cadastro e login)

// --- Lógica de LOGOUT ---
// Seleciona o botão de logout pelo ID 'sair' que você colocou no seu agendamento.html
const btnLogout = document.getElementById('sair');

// Verifica se o botão de logout existe na página atual antes de adicionar o ouvinte
if (btnLogout) {
    btnLogout.addEventListener('click', async (event) => {
        event.preventDefault(); // Impede o comportamento padrão do botão de submit ou link

        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error('Erro ao fazer logout:', error.message);
            alert(`Erro ao sair: ${error.message}`); // Mensagem simples para o usuário
        } else {
            console.log('Usuário deslogado com sucesso.');
            alert('Você foi desconectado.');
            // Redireciona para a página inicial (ou de login) após o logout
            window.location.href = '../index.html'; // Ajuste o caminho se necessário. Se index.html está na raiz, use '../index.html'
        }
    });
}