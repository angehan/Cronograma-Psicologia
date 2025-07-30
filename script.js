const materias = [
  { id: 'psicologia_general', nombre: 'Psicología General', prerequisitos: [] },
  { id: 'neuroanatomia', nombre: 'Neuroanatomía', prerequisitos: [] },
  { id: 'teoria_conocimiento', nombre: 'Intro Teoría del Conocimiento', prerequisitos: [] },
  { id: 'bases_biologicas', nombre: 'Bases Biológicas de la Conducta', prerequisitos: [] },
  { id: 'ingles1', nombre: 'Inglés Comunicativo I', prerequisitos: [] },
  { id: 'optativa1', nombre: 'Optativa', prerequisitos: [] },
  { id: 'medicion1', nombre: 'Medición en Psicología I', prerequisitos: [] },
  { id: 'sensopercepcion', nombre: 'Sensopercepción', prerequisitos: ['neuroanatomia'] },
  { id: 'cultura_mexicana', nombre: 'Cultura y Sociedad Mexicana', prerequisitos: [] },
  { id: 'motivacion_emocion', nombre: 'Motivación y Emoción', prerequisitos: [] },
  { id: 'ingles2', nombre: 'Inglés Comunicativo II', prerequisitos: ['ingles1'] },
  { id: 'comunicacion', nombre: 'Competencias Comunicativas', prerequisitos: [] },
  { id: 'medicion2', nombre: 'Medición en Psicología II', prerequisitos: ['medicion1'] },
  { id: 'desarrollo', nombre: 'Desarrollo Psicológico', prerequisitos: [] },
  { id: 'corrientes', nombre: 'Corrientes Contemporáneas', prerequisitos: [] },
  { id: 'aprendizaje', nombre: 'Procesos de Aprendizaje', prerequisitos: ['psicologia_general', 'bases_biologicas'] },
  { id: 'ingles3', nombre: 'Inglés Comunicativo III', prerequisitos: ['ingles2'] },
  { id: 'pensamiento_lenguaje', nombre: 'Pensamiento y Lenguaje', prerequisitos: ['psicologia_general', 'bases_biologicas'] },
  { id: 'medicion3', nombre: 'Medición en Psicología III', prerequisitos: ['medicion2'] },
  { id: 'etica', nombre: 'Ética', prerequisitos: [] },
  { id: 'psicologia_social', nombre: 'Psicología Social', prerequisitos: ['psicologia_general', 'medicion2'] },
  { id: 'competencias_dh', nombre: 'Competencias para el Desarrollo Humano', prerequisitos: ['comunicacion'] },
  { id: 'pensamiento_critico', nombre: 'Pensamiento Crítico', prerequisitos: ['aprendizaje', 'pensamiento_lenguaje'] },
  { id: 'psicometria', nombre: 'Psicometría', prerequisitos: ['medicion3', 'etica'] },
  { id: 'psicopatologia', nombre: 'Psicopatología', prerequisitos: ['pensamiento_lenguaje', 'motivacion_emocion', 'aprendizaje'] },
  { id: 'entrevista', nombre: 'Entrevista Psicológica', prerequisitos: ['medicion3'] },
  { id: 'experimental', nombre: 'Psicología Experimental', prerequisitos: ['aprendizaje', 'medicion3'] },
  { id: 'metodologia', nombre: 'Metodología', prerequisitos: [] },
  { id: 'clinica', nombre: 'Psicología Clínica', prerequisitos: ['psicometria', 'psicopatologia', 'entrevista'] },
  { id: 'educativa', nombre: 'Psicología Educativa', prerequisitos: ['desarrollo', 'aprendizaje', 'psicometria'] },
  { id: 'organizacional', nombre: 'Psicología Organizacional', prerequisitos: ['psicologia_social', 'entrevista'] },
  { id: 'transcultural', nombre: 'Psicología Transcultural', prerequisitos: ['psicologia_social', 'cultura_mexicana'] },
  { id: 'topicos1', nombre: 'Tópicos en Psicología I', prerequisitos: [] },
  { id: 'servicio', nombre: 'Servicio Social', prerequisitos: [] },
  { id: 'practicas1', nombre: 'Prácticas I', prerequisitos: ['clinica', 'educativa', 'organizacional'] },
  { id: 'topicos2', nombre: 'Tópicos en Psicología II', prerequisitos: ['topicos1'] },
  { id: 'psicoterapia', nombre: 'Psicoterapia', prerequisitos: ['entrevista', 'clinica', 'educativa', 'organizacional'] },
  { id: 'competencias_ejercicio', nombre: 'Competencias para el Ejercicio', prerequisitos: ['competencias_dh'] },
  { id: 'practicas2', nombre: 'Prácticas II', prerequisitos: ['practicas1'] },
  { id: 'modificacion', nombre: 'Modificación de la Conducta', prerequisitos: ['clinica'] },
  { id: 'seminario1', nombre: 'Seminario de Investigación I', prerequisitos: ['teoria_conocimiento', 'comunicacion', 'medicion3'] },
  { id: 'optativa2', nombre: 'Optativa', prerequisitos: [] },
  { id: 'practicas3', nombre: 'Prácticas III', prerequisitos: ['practicas2'] },
  { id: 'intervencion', nombre: 'Intervención Comunitaria', prerequisitos: ['experimental', 'modificacion'] },
  { id: 'seminario2', nombre: 'Seminario de Investigación II', prerequisitos: ['seminario1'] },
  { id: 'optativa3', nombre: 'Optativa', prerequisitos: [] }
];

const mallaDiv = document.getElementById('malla');
let aprobadas = JSON.parse(localStorage.getItem('aprobadas')) || [];

function render() {
  mallaDiv.innerHTML = '';
  materias.forEach(materia => {
    const div = document.createElement('div');
    div.classList.add('materia');
    div.textContent = materia.nombre;

    const bloqueada = materia.prerequisitos.some(pr => !aprobadas.includes(pr));
    if (bloqueada && !aprobadas.includes(materia.id)) {
      div.classList.add('bloqueada');
    } else if (aprobadas.includes(materia.id)) {
      div.classList.add('aprobada');
    }

    div.addEventListener('click', () => {
      if (bloqueada) return;
      if (aprobadas.includes(materia.id)) {
        aprobadas = aprobadas.filter(id => id !== materia.id);
      } else {
        aprobadas.push(materia.id);
      }
      localStorage.setItem('aprobadas', JSON.stringify(aprobadas));
      render();
    });

    mallaDiv.appendChild(div);
  });
}

render();

