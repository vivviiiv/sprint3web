document.addEventListener('DOMContentLoaded', function () {
    const monthBR = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    const tableDays = document.getElementById('dias');
    const yearElement = document.getElementById('ano');
    let selectedDate = null;

    let mes = (new Date()).getMonth();
    let ano = (new Date()).getFullYear();
    getDaysCalendar(mes, ano);

    function getDaysCalendar(mes, ano) {
        document.getElementById('mes').innerHTML = monthBR[mes];
        yearElement.innerHTML = ano;

        let firstDayOfWeek = new Date(ano, mes, 1).getDay() - 1;
        let getLastDayThisMonth = new Date(ano, mes + 1, 0).getDate();

        let html = '';
        let dayCounter = 1;

        for (let i = 0; i < 6; i++) {
            html += '<tr>';
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDayOfWeek) {
                    html += '<td class="mes-anterior"></td>';
                } else if (dayCounter > getLastDayThisMonth) {
                    html += '<td class="proximo-mes"></td>';
                } else {
                    let dt = new Date(ano, mes, dayCounter);
                    let dtNow = new Date();
                    let className = '';

                    if (dt.getFullYear() === dtNow.getFullYear() && dt.getMonth() === dtNow.getMonth() && dt.getDate() === dtNow.getDate()) {
                        className = 'dia-atual';
                    }

                    if (selectedDate && dt.getTime() === selectedDate.getTime()) {
                        className += ' data-selecionada';
                    }

                    html += `<td class="${className}">${dayCounter}</td>`;
                    dayCounter++;
                }
            }
            html += '</tr>';
        }

        tableDays.innerHTML = html;

        const cells = document.querySelectorAll('#dias td:not(.mes-anterior):not(.proximo-mes)');
        cells.forEach(cell => {
            cell.addEventListener('click', () => {
                const day = parseInt(cell.textContent);
                const currentSelected = document.querySelector('.data-selecionada');
                
                if (currentSelected) {
                    currentSelected.classList.remove('data-selecionada');
                }
                
                if (selectedDate && selectedDate.getDate() === day) {
                    selectedDate = null;
                } else {
                    selectedDate = new Date(ano, mes, day);
                    cell.classList.add('data-selecionada');
                }

                getDaysCalendar(mes, ano);
            });
        });
    }

    const botaoProximo = document.getElementById('btn_pro');
    const botaoAnterior = document.getElementById('btn_ant');

    botaoProximo.onclick = function () {
        mes++;
        if (mes > 11) {
            mes = 0;
            ano++;
        }
        getDaysCalendar(mes, ano);
    };

    botaoAnterior.onclick = function () {
        mes--;
        if (mes < 0) {
            mes = 11;
            ano--;
        }
        getDaysCalendar(mes, ano);
    };
});

