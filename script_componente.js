class AulasComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.hoje = "ter";
  }

  connectedCallback() {
    this.loadData();
  }

  loadData() {
    // Dados estáticos para teste
    const aulas = [
      {
        "id": 1,
        "disciplina": "S05 - Interface Homem-máquina",
        "data": "ter",
        "horario": "10:00",
        "local": "P1-S17",
        "prova_alert": false,
        "prova": "12/05",
        "frequencia": "10/25",
        "nota": "9"
      },
      {
        "id": 2,
        "disciplina": "E01 - Circuitos Elétricos em Corrente Contínua",
        "data": "ter",
        "horario": "10:00",
        "local": "P1-S17",
        "prova_alert": true,
        "prova": "12/05",
        "frequencia": "10/25",
        "nota": "5"
      },
      {
        "id": 3,
        "disciplina": "M02 - Álgebra e Geometria Analítica",
        "data": "ter",
        "horario": "10:00",
        "local": "P1-S17",
        "prova_alert": true,
        "prova": "12/05",
        "frequencia": "10/25",
        "nota": "7"
      }
    ];
    this.render(aulas);

    // Descomente o código abaixo para voltar a usar o fetch quando o problema for resolvido
    /*
    try {
      const response = await fetch('aulas.json');
      if (!response.ok) {
        throw new Error(`Erro ao carregar aulas.json: ${response.statusText}`);
      }
      const aulas = await response.json();
      if (!aulas || aulas.length === 0) {
        this.renderError("Nenhuma aula encontrada no arquivo aulas.json.");
        return;
      }
      this.render(aulas);
    } catch (error) {
      console.error('Erro ao carregar os dados das aulas:', error);
      this.renderError(`Erro ao carregar as aulas: ${error.message}`);
    }
    */
  }

  renderError(message) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'styles_componente.css'; 
    this.shadowRoot.appendChild(link);

    this.shadowRoot.innerHTML += `
      <div class="error-message">
        <p>${message}</p>
      </div>
    `;
  }

  render(aulas) {
    const aulasDia = aulas.filter(a => a.data === this.hoje);

    if (aulasDia.length === 0) {
      this.renderError("Nenhuma aula encontrada para o dia de hoje (terça-feira).");
      return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'styles_componente.css'; 
    this.shadowRoot.appendChild(link); 

    this.shadowRoot.innerHTML += `
      <div>
        ${aulasDia.map(a => {
          let provaDisplay = a.prova_alert ? '' : 'display: none;';
          let notaColor;
          const nota = parseFloat(a.nota);
          if (nota < 6) {
            notaColor = 'red';
          } else if (nota >= 6 && nota < 8) {
            notaColor = 'orange';
          } else if (nota >= 8) {
            notaColor = 'green';
          }
          
          return `
            <div class="comp-aula">
              <div class="lable-prova p_lable" style="${provaDisplay}">PROVA: ${a.prova}</div>
              <div class="titulo_aula">${a.disciplina}</div>
              <p class="p">LOCAL E HORÁRIO: ${a.local} - ${a.horario}</p>
              <div class="lables">
                <div class="lable-frequencia p_lable">FALTAS: ${a.frequencia}</div>
                <div class="lable-nota p_lable" style="background-color: ${notaColor};">CR: ${a.nota}</div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }
}

customElements.define('aulas-component', AulasComponent);