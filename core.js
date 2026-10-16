export const SCENARIOS = Object.freeze([
  {
    id:'sales', label:'01 · MBA analytics', title:'A confident sales summary',
    prompt:'An AI assistant was asked to advise a manager after seeing this fictional monthly table.',
    facts:['Web: 40 orders, ₹12,000 revenue, ₹3,000 campaign spend.','Store: 30 orders, ₹10,500 revenue, ₹1,000 campaign spend.','No product costs, customer mix or prior-month baseline were supplied.'],
    claims:[
      {id:'sales-a', text:'Web revenue was ₹1,500 higher than Store revenue.', answer:'supported', why:'₹12,000 − ₹10,500 = ₹1,500. The claim uses the stated revenue data accurately.'},
      {id:'sales-b', text:'Web generated ₹9,000 profit.', answer:'unsupported', why:'₹12,000 − ₹3,000 leaves ₹9,000 before product and other costs. Calling it profit is not justified.'},
      {id:'sales-c', text:'Move all next month’s marketing budget to Web.', answer:'qualified', why:'The choice needs margins, acquisition costs, customer quality and a baseline. Higher revenue alone cannot justify reallocating all spend.'}
    ]
  },
  {
    id:'training', label:'02 · Learning evidence', title:'A training outcome claim',
    prompt:'An AI assistant drafted a report on a fictional cohort of 20 learners.',
    facts:['The same 20 learners averaged 62/100 before and 74/100 after a workshop.','No comparison group or follow-up assessment was used.','Individual scores include names and are private.'],
    claims:[
      {id:'training-a', text:'The cohort average increased by 12 points.', answer:'supported', why:'The same group averaged 74 after and 62 before: 74 − 62 = 12 points. This describes an observed change, not its cause.'},
      {id:'training-b', text:'The workshop caused the entire increase.', answer:'qualified', why:'A before/after difference is observed, but without a comparison group other explanations remain possible.'},
      {id:'training-c', text:'Publish every learner’s name and score to prove the result.', answer:'unsupported', why:'The report can use aggregate results. Private individual scores should not be disclosed just to support a public claim.'}
    ]
  },
  {
    id:'code', label:'03 · Python check', title:'A plausible code explanation',
    prompt:'An AI assistant explained a small Python expression for a beginner.',
    facts:['Code: values = [3, 6, 9]','Code: result = sum(values) / len(values)','No rounding or filtering is applied.'],
    claims:[
      {id:'code-a', text:'The expression calculates an arithmetic mean.', answer:'supported', why:'It divides the sum of all three values by their count. For this nonempty list, that is the arithmetic mean.'},
      {id:'code-b', text:'The result is 5.0.', answer:'unsupported', why:'(3 + 6 + 9) ÷ 3 = 6.0. The stated 5.0 does not follow from the code or the supplied list.'},
      {id:'code-c', text:'The same expression is safe for every list.', answer:'qualified', why:'An empty list makes len(values) zero, causing division by zero. Validate input before relying on it generally.'}
    ]
  }
]);

export const LABELS = Object.freeze({ supported:'Supported by evidence', unsupported:'Unsupported or incorrect', qualified:'Needs qualification' });
export function evaluate(responses = {}, scenarios = SCENARIOS) {
  const items = scenarios.flatMap(s => s.claims.map(c => ({ ...c, scenario: s.id, choice: responses[c.id] || null, correct: responses[c.id] === c.answer })));
  return { items, correct: items.filter(i => i.correct).length, answered: items.filter(i => i.choice).length, total: items.length };
}
