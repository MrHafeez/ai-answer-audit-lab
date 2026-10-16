import { SCENARIOS, LABELS, evaluate } from './core.js';
const $ = id => document.getElementById(id);
const list = $('scenario-list');
for (const scenario of SCENARIOS) {
  const section = document.createElement('section'); section.className = 'scenario'; section.setAttribute('aria-labelledby', `title-${scenario.id}`);
  const tag = document.createElement('p'); tag.className = 'case-tag'; tag.textContent = scenario.label;
  const title = document.createElement('h3'); title.id = `title-${scenario.id}`; title.textContent = scenario.title;
  const prompt = document.createElement('p'); prompt.textContent = scenario.prompt;
  const facts = document.createElement('ul'); facts.className = 'facts';
  scenario.facts.forEach(fact => { const li = document.createElement('li'); li.textContent = fact; facts.append(li); });
  section.append(tag,title,prompt,facts);
  scenario.claims.forEach((claim,index) => {
    const box = document.createElement('div'); box.className = 'claim';
    const text = document.createElement('strong'); text.textContent = `Claim ${index+1}: “${claim.text}”`;
    const options = document.createElement('div'); options.className = 'claim-options'; options.setAttribute('role','radiogroup'); options.setAttribute('aria-label', `Judge claim ${index+1} in ${scenario.title}`);
    for (const [value,labelText] of Object.entries(LABELS)) {
      const label = document.createElement('label'); const input = document.createElement('input'); input.type='radio'; input.name=claim.id; input.value=value; input.addEventListener('change',updateProgress);
      const span = document.createElement('span'); span.textContent=labelText; label.append(input,span); options.append(label);
    }
    box.append(text,options); section.append(box);
  });
  list.append(section);
}
const allClaims = SCENARIOS.flatMap(s => s.claims);
function responses(){ return Object.fromEntries(allClaims.map(c => [c.id, document.querySelector(`input[name="${c.id}"]:checked`)?.value || null])); }
function updateProgress(){ const answered=evaluate(responses()).answered; $('progress-label').textContent=`${answered} of ${allClaims.length} answered`; $('progress-fill').style.width=`${100*answered/allClaims.length}%`; }
function showFeedback(){
  const scored=evaluate(responses()); $('score').textContent=`${scored.correct} of ${scored.total} correct · ${scored.answered} answered. Read the evidence behind every judgement.`;
  const feedback=$('feedback'); feedback.replaceChildren();
  scored.items.forEach((item,index)=>{
    const box=document.createElement('div'); box.className=`feedback-item ${item.correct?'good':'review'}`;
    const head=document.createElement('strong'); head.textContent=`${index+1}. ${item.text}`;
    const judgement=document.createElement('p'); judgement.className='judgement'; judgement.textContent=`Your choice: ${item.choice?LABELS[item.choice]:'Not answered'} · Evidence-based judgement: ${LABELS[item.answer]}`;
    const why=document.createElement('p'); why.textContent=item.why; box.append(head,judgement,why); feedback.append(box);
  });
  $('results').focus(); $('results').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
}
$('check').addEventListener('click',showFeedback);
$('reset').addEventListener('click',()=>{ document.querySelectorAll('input[type="radio"]').forEach(input=>input.checked=false); $('feedback').replaceChildren(); $('score').textContent='Complete the claims, then check your answers.'; updateProgress(); $('cases').scrollIntoView({behavior:'smooth'}); });
updateProgress();
