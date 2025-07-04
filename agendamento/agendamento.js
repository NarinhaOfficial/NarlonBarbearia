// Inicializa o flatpickr para o calendário
flatpickr("#calendario", {
    dateFormat: "Y-m-d",
    locale: "pt",
    minDate: "today",
    disable: [
        function (date) {
            // Desabilita domingos (0 = domingo)
            return date.getDay() === 0;
        }
    ],
    onChange: function (selectedDates, dateStr) {
        const dataSelecionada = new Date(dateStr);
        const diaSemana = dataSelecionada.getDay(); // 0=domingo, 6=sábado
        const horarioSelect = document.getElementById("horario");

        horarioSelect.innerHTML = ""; // Limpa opções
        horarioSelect.disabled = false;

        let horarios = [];

        if (diaSemana >= 1 && diaSemana <= 5) { // Segunda a sexta
            horarios = gerarHorarios("08:00", "12:00").concat(gerarHorarios("14:00", "18:00"));
        } else if (diaSemana === 6) { // Sábado
            horarios = gerarHorarios("08:00", "14:00");
        }

        horarios.forEach(horario => {
            const option = document.createElement("option");
            option.value = horario;
            option.textContent = horario;
            horarioSelect.appendChild(option);
        });
    }
});

// Gera horários de 30 em 30 minutos entre dois horários
function gerarHorarios(inicio, fim) {
    const horarios = [];
    let [h, m] = inicio.split(":").map(Number);
    const [hf, mf] = fim.split(":").map(Number);

    while (h < hf || (h === hf && m < mf)) {
        const horaFormatada = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
        horarios.push(horaFormatada);

        m += 30;
        if (m >= 60) {
            m = 0;
            h++;
        }
    }

    return horarios;
}

// Apenas exibe a confirmação (depois podemos salvar no Supabase)
function confirmarAgendamento() {
    const data = document.getElementById("calendario").value;
    const hora = document.getElementById("horario").value;
    const mensagem = document.getElementById("mensagem");

    if (!data || !hora) {
        mensagem.textContent = "Escolha uma data e horário.";
        mensagem.style.color = "red";
        return;
    }

    mensagem.textContent = `Agendamento confirmado para ${data} às ${hora}.`;
    mensagem.style.color = "green";
}
