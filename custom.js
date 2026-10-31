// custom.js — add your own questions here so they appear on the "My questions" page for everyone using this site.
// topic must be one of: soc, mech, energy, motion, friction, logic, circuits, stress, phase, steel, plastics
// Questions added inside the website itself are saved only in that browser (localStorage).
export default [
  {
    topic: 'circuits',
    q: 'A 24 V battery supplies two 12 Ω heating elements connected in parallel. Calculate the total current and the total power.',
    a: 'R_total = (12 × 12) ÷ (12 + 12) = 6 Ω\nI = V ÷ R = 24 ÷ 6 = 4 A\nP = VI = 24 × 4 = 96 W',
    marks: 3
  },
  {
    topic: 'mech',
    q: 'Explain why a worm and wheel is suitable for a winch that must hold its load when the motor stops.',
    a: 'A worm drive is self-locking: the worm can turn the wheel, but friction and the low helix angle stop the wheel from back-driving the worm. The load is held without a brake. It also gives a very high VR (teeth on wheel ÷ starts) in a compact right-angle drive.',
    marks: 2
  }
];
