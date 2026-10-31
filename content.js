// content.js — lessons, formulas and practice generators for QCAA Engineering Unit 4 (Machines and mechanisms)
// Based on the Engineering 2025 v1.4 syllabus (March 2026) and the Unit 4 student learning guide. g = 9.8 m/s².

export const TOPICS = [
{
  id: 'soc', title: 'Machines in society', group: 'Topic 1 · Machines in society', icon: '🏙️',
  blurb: 'Careers, the problem-solving process, community problems and the bicycle, car jack and crowbar.',
  syllabus: [
    'Use the problem-solving process in Engineering to solve a complex open-ended machine/mechanism problem',
    'Comprehend the scope of knowledge needed in mechanical, mechatronic and biomechanical engineering careers',
    'Analyse community problems involving machines as solutions (expertise in technology, mechanics, materials science and control technologies)',
    'Comprehend the function and purpose of basic machines: bicycle, car jack, crowbar'
  ],
  lesson: `
<h3>What is a machine?</h3>
<p>A <b>machine</b> is a device that uses energy to apply forces and control movement to do a task, often beyond what a person could do alone. A <b>mechanism</b> is the part of a machine that changes one type of motion or force into another (e.g. gears, levers, a crank and slider). Machines help by:</p>
<ul><li><b>multiplying force</b> (MA &gt; 1, e.g. car jack, crowbar),</li><li><b>multiplying distance or speed</b> (VR &lt; 1, e.g. bicycle in a high gear),</li><li><b>changing direction</b> of a force (e.g. a fixed pulley),</li><li><b>changing the type of motion</b> (rotary → reciprocating in an engine).</li></ul>

<h3>Engineering careers involving machines</h3>
<table class="tbl"><tr><th>Career</th><th>What they do</th><th>Knowledge used</th></tr>
<tr><td><b>Mechanical</b></td><td>Design, test and maintain machines: vehicles, engines, mining and farm machinery, lifts, HVAC, robots.</td><td>Mechanics (forces, motion, energy), materials science, thermodynamics, manufacturing, CAD.</td></tr>
<tr><td><b>Mechatronic</b></td><td>Combine mechanical, electrical and computer systems into "smart" machines: robots, automated production lines, ABS brakes, drones.</td><td>Mechanics, electronics, sensors and actuators, control/logic, programming.</td></tr>
<tr><td><b>Biomechanical / biomedical</b></td><td>Apply engineering to the human body: prosthetics, implants, exoskeletons, surgical robots, sports equipment.</td><td>Biology and anatomy, biomechanics (forces on the body), biocompatible materials, electronics/control, ethics.</td></tr></table>
<div class="tip"><b>Exam pattern (2021 Q12):</b> "State four fields of knowledge used by a biomedical engineer" → e.g. 1. human anatomy/physiology 2. mechanics/biomechanics 3. materials science (biocompatible materials) 4. electronics and control technology. One field per line, no explanation needed for "state".</div>

<h3>Basic machines in the syllabus</h3>
<table class="tbl"><tr><th>Machine</th><th>Function and purpose</th><th>Simple machines inside</th></tr>
<tr><td><b>Crowbar</b></td><td>Pry or lift heavy objects (floorboards, nails). A small effort over a long distance produces a large force over a short distance: MA &gt; 1.</td><td>First-order lever (fulcrum between effort and load) — or second order when the tip is the fulcrum.</td></tr>
<tr><td><b>Car jack</b></td><td>Lift a vehicle with a small hand force. Huge MA because the handle moves a long way (circumference) for a tiny lift (pitch).</td><td>Screw (inclined plane wrapped around a cylinder) + lever (handle); scissor linkage.</td></tr>
<tr><td><b>Bicycle</b></td><td>Convert the rider's reciprocating leg motion into rotary wheel motion and linear motion of the bike. Gears let the rider trade force for speed.</td><td>Pedal crank (lever/wheel and axle), chain and sprocket drive, brake levers, wheel and axle.</td></tr></table>
<div class="tip"><b>Bicycle up a hill (2023 Q12):</b> select a <b>small front (pedal) sprocket and large rear sprocket</b>. The pedals turn more times for each wheel turn → higher VR and MA, so <b>less force</b> is needed on the pedals. <b>Work done stays the same</b> (W = F × d): the smaller force acts through a greater distance (more pedal rotations).</div>

<h3>The problem-solving process in Engineering</h3>
<ol><li><b>Explore</b> — identify and describe the problem, research it, find constraints and determine <b>success criteria</b>.</li>
<li><b>Develop ideas</b> — sketch, symbolise and analyse possible solutions using engineering knowledge (mechanics, materials, control).</li>
<li><b>Generate</b> — build and test a prototype (physical or virtual) to collect data on feasibility.</li>
<li><b>Evaluate and refine</b> — compare against success criteria, refine, make justified recommendations.</li>
<li><b>Communicate</b> throughout — drawings, reports, presentations.</li></ol>

<h3>Community problems with machine solutions</h3>
<p>Exam questions describe a community problem (flood isolation, irrigation in a developing country, sustainability, securing small business premises) and ask you to <b>identify a machine/mechanism solution</b> and explain how engineers used their expertise in <b>materials science, mechanics and control technology</b>, plus benefits.</p>
<div class="tip"><b>Answer template (6 marks, 2025 Q15 / 2024 Q16):</b><br>
1. <b>Name the solution</b> clearly (e.g. "electronic multipoint locking system", "amphibious all-terrain delivery vehicle", "solar-powered water pump").<br>
2. <b>Materials science</b>: which material and the property that matters (e.g. hardened medium-carbon steel bolts resist cutting; UV-stable polycarbonate covers).<br>
3. <b>Mechanics</b>: forces, gears, levers, MA, motion (e.g. one handle moves several locking bars through a rack-and-pinion).<br>
4. <b>Control technology</b>: sensors, logic gates, inputs → outputs (e.g. keypad AND valid card → unlock; door sensor OR motion sensor → alarm).<br>
5. <b>Two benefits</b> to the community (cost, safety, health, access, environment), each linked to the problem.</div>
<p>Organisations to mention: Engineers Without Borders (EWB), RedR Australia (disaster relief).</p>
`
},
{
  id: 'mech', title: 'Simple machines: MA, VR, levers, pulleys, screws, gears', group: 'Topic 2 · Machines, mechanisms and control', icon: '⚙️',
  blurb: 'Types of motion, MA and VR, levers, inclined planes and screws, pulleys, belts, and spur, worm and rack-and-pinion gears.',
  syllabus: [
    'Identify four types of motion: linear, rotary, oscillatory, reciprocating',
    'Calculate MA = load/effort, VR = d<sub>E</sub>/d<sub>L</sub>, VR of screws = 2πr/P',
    'Inclined planes and screws; levers (1st, 2nd, 3rd order); simple pulley systems (VR = number of supporting ropes)',
    'Belts (flat and V): VR = driven/driver (radius, diameter, circumference) = input speed/output speed',
    'Spur, worm, and rack and pinion gears: GR = driven/driver (teeth) = angular movement of driver/driven'
  ],
  sim: ['lever', 'pulley', 'gears'],
  lesson: `
<h3>Four types of motion</h3>
<table class="tbl"><tr><th>Motion</th><th>Description</th><th>Examples</th></tr>
<tr><td><b>Linear</b></td><td>Movement in a straight line, one direction</td><td>Conveyor belt, lift, rack moved by a pinion</td></tr>
<tr><td><b>Rotary</b></td><td>Movement in a circle around an axis</td><td>Wheel, gear, motor shaft, crank</td></tr>
<tr><td><b>Oscillatory</b></td><td>Swinging back and forth along a curved arc about a pivot</td><td>Pendulum, swing, windscreen wiper arm</td></tr>
<tr><td><b>Reciprocating</b></td><td>Back and forth along a straight line</td><td>Piston, slider in a crank–slider, sewing needle, jigsaw blade</td></tr></table>
<div class="tip">Crank–slider (2024 MC3) and steam engine piston rod (2022 MC10): the crank is <b>rotary</b>, the slider/piston rod is <b>reciprocating</b>.</div>

<h3>Mechanical advantage, velocity ratio and efficiency</h3>
<div class="eq">MA = load ÷ effort = F<sub>L</sub> ÷ F<sub>E</sub></div>
<div class="eq">VR = distance moved by effort ÷ distance moved by load = d<sub>E</sub> ÷ d<sub>L</sub></div>
<div class="eq">η = MA ÷ VR × 100%</div>
<ul><li><b>MA</b> tells you the force multiplication (affected by friction).</li>
<li><b>VR</b> depends only on geometry (distances, teeth, ropes) — friction doesn't change it.</li>
<li>Ideal machine (100% efficient): MA = VR. Real machines: MA &lt; VR.</li>
<li><b>Work in = F<sub>E</sub> × d<sub>E</sub></b>; <b>useful work out = F<sub>L</sub> × d<sub>L</sub></b>. A machine never gives more work out than in.</li></ul>
<div class="tip"><b>Explaining MA and VR (2022 Q11, 2024 Q11):</b> MA = how many times the machine multiplies the effort force; VR = how many times further the effort moves than the load. Machines trade distance for force: if VR = 4, the effort moves 4 m for every 1 m the load rises, so (ideally) only ¼ of the force is needed. Always include a <b>labelled sketch</b> showing F<sub>E</sub>, F<sub>L</sub>, d<sub>E</sub>, d<sub>L</sub> (and the fulcrum for levers).</div>

<h3>Levers</h3>
<table class="tbl"><tr><th>Order</th><th>Arrangement</th><th>MA</th><th>Examples</th></tr>
<tr><td><b>1st</b></td><td>Fulcrum <b>between</b> effort and load (E–F–L)</td><td>&gt;1, =1 or &lt;1</td><td>Crowbar, see-saw, scissors, pliers</td></tr>
<tr><td><b>2nd</b></td><td>Load between fulcrum and effort (F–L–E)</td><td>Always &gt; 1</td><td>Wheelbarrow, bottle opener, nutcracker</td></tr>
<tr><td><b>3rd</b></td><td>Effort between fulcrum and load (F–E–L)</td><td>Always &lt; 1 (gains distance/speed)</td><td>Tweezers, fishing rod, human forearm, broom</td></tr></table>
<p>For a lever, VR = effort arm ÷ load arm (distances from the fulcrum). Moments: F<sub>E</sub> × effort arm = F<sub>L</sub> × load arm (ideal).</p>
<p class="mnemo">Mnemonic: <b>"FLE 1-2-3"</b> — the thing in the middle is <b>F</b>ulcrum (1st), <b>L</b>oad (2nd), <b>E</b>ffort (3rd).</p>

<h3>Inclined planes and screws</h3>
<p>An <b>inclined plane</b> lets you raise a load to height h by pushing it along slope length L: VR = L ÷ h.</p>
<p>A <b>screw</b> is an inclined plane wrapped around a cylinder. One full turn of the effort (radius r of the handle/lever arm) advances the load by the <b>pitch P</b> (distance between threads).</p>
<div class="eq">VR of screws = circumference ÷ pitch = 2πr ÷ P</div>
<ul><li>r = radius of the <b>effort</b> (handle or lever arm), not of the thread.</li>
<li>For a multi-start thread, the load moves the <b>lead</b> per turn: lead = pitch × number of starts. Use the lead in place of P. (2022 MC4: pitch 2.5 mm but rises 5 mm per turn → use 5 mm.)</li>
<li>Number of turns = distance the load moves ÷ pitch (or lead).</li></ul>

<h3>Pulleys</h3>
<p>A <b>fixed pulley</b> only changes the direction of the force (VR = 1). A <b>moveable pulley</b> moves with the load. With one continuous rope:</p>
<div class="eq">VR = number of rope sections supporting the moving (load) block</div>
<ul><li>Count the ropes going <b>into the moving block</b> (include the end tied to the block). Do not count the rope you pull if it comes down from a fixed pulley.</li>
<li>Effort rope moves VR × load distance (2021 MC5: 4 supporting ropes, lift 20 m → cable moves 80 m).</li>
<li>Ideal effort = load ÷ VR. Real: F<sub>E</sub> = F<sub>L</sub> ÷ (η × VR).</li></ul>

<h3>Belts and chains (flat and V-belts)</h3>
<div class="eq">VR = driven pulley size ÷ driver pulley size = input speed ÷ output speed</div>
<p>"Size" can be radius, diameter or circumference — just use the same for both pulleys. Watch for one given as radius and one as diameter (2023 MC4: driver Ø200 mm, driven r = 250 mm → Ø500 mm, VR = 2.5).</p>
<p>V-belts wedge into the groove so they grip better and slip less than flat belts; flat belts are quieter and can run at higher speed. Crossed belts reverse the direction of rotation.</p>

<h3>Gears</h3>
<div class="eq">GR or VR = teeth on driven ÷ teeth on driver = angular movement of driver ÷ angular movement of driven</div>
<ul><li><b>Spur gears</b>: meshing gears turn in <b>opposite</b> directions. An <b>idler</b> gear between them restores the same direction and does not change the GR.</li>
<li><b>Compound gear train</b>: two gears fixed on one shaft turn together. Total VR = product of each pair's VR.</li>
<li><b>Worm and wheel</b>: a single-start worm advances the wheel <b>one tooth per revolution</b>. VR = teeth on wheel ÷ number of starts. Very high VR in a small space, right-angle drive, and usually <b>self-locking</b> (the wheel cannot drive the worm), so a lift or winch holds its load. Lower efficiency because of sliding friction.</li>
<li><b>Rack and pinion</b>: converts rotary → linear motion. Distance the rack moves per pinion turn = circumference of pinion = number of teeth × tooth pitch.</li>
<li>Ratios written "1:3" for a bicycle mean 1 turn of the pedals : 3 turns of the wheel (a speed increase).</li></ul>
<div class="tip"><b>Speed and torque:</b> a big driven gear (VR &gt; 1) turns <b>slower</b> but with <b>more turning force</b>. Output speed = input speed ÷ VR.</div>

<h3>Worked example — worm-driven platform lift (2025 Q20 style)</h3>
<p>A single-thread worm drives a 60-tooth worm wheel of diameter 150 mm fixed to a pinion that raises a lift 2 m. How many turns of the worm wheel?</p>
<p>Distance per wheel turn = π × 0.150 = 0.471 m → turns = 2 ÷ 0.471 = <b>4.24 turns</b> of the wheel. Worm turns = 4.24 × 60 = 255 turns.</p>
`
},
{
  id: 'energy', title: 'Work, power, energy and efficiency', group: 'Topic 2 · Machines, mechanisms and control', icon: '⚡',
  blurb: 'W = Fs, P = W/t, KE, PE, conservation of mechanical energy, and efficiency of machines.',
  syllabus: [
    'Work done W = F s (distance moved in direction of force)',
    'Power P = W/t',
    'Energy sources and conversions: total mechanical energy = KE + PE; KE = ½mv², PE = mgh',
    'Efficiency η = useful output/input × 100% = MA/VR × 100%'
  ],
  sim: ['energy'],
  lesson: `
<h3>Work</h3>
<div class="eq">W = F × s &nbsp;&nbsp;(J = N × m)</div>
<p>Only the distance moved <b>in the direction of the force</b> counts. Lifting at constant speed: F = mg, so W = mgh. Pushing up a ramp at constant speed: F = friction + mg sinθ, distance along the slope (2023 MC10).</p>

<h3>Power</h3>
<div class="eq">P = W ÷ t &nbsp;&nbsp;(W = J/s)</div>
<p>Useful shortcut at constant velocity: P = F × v. (2022 MC3: go-kart wheel speed v = πdn/60, P = 100 N × 14.66 m/s ≈ 1.5 kW.) Convert kW → W (×1000) and minutes → seconds (×60).</p>

<h3>Mechanical energy</h3>
<div class="eq">KE = ½ m v² &nbsp;&nbsp;&nbsp; PE = m g h &nbsp;&nbsp;&nbsp; E<sub>total</sub> = KE + PE</div>
<ul><li>With no friction, total mechanical energy is <b>conserved</b>: PE lost = KE gained. A falling object: mgh = ½mv² → v = √(2gh) (mass cancels — 2023 MC7).</li>
<li>Heights are measured from a reference level the question chooses (2022 MC5 — the outlet 1 m above ground; use the tank's midpoint).</li>
<li>With friction, the "lost" energy = work done against friction = F<sub>f</sub> × distance (turns into heat).</li>
<li>Water: 1 L has a mass of 1 kg; 1 kL = 1000 kg.</li></ul>

<h3>Efficiency</h3>
<div class="eq">η = useful output ÷ input × 100% = MA ÷ VR × 100%</div>
<p>Output and input can be work, energy or power — just be consistent. To find the <b>input</b> needed: input = useful output ÷ η (e.g. a 62% efficient motor delivering 65.3 W needs 65.3 ÷ 0.62 = 105.4 W). For machines in series, multiply efficiencies: η<sub>total</sub> = η<sub>1</sub> × η<sub>2</sub>.</p>

<h3>Worked example (2021 MC7)</h3>
<p>A 75% efficient pulley raises 120 kg by 3 m; 8 m of rope is pulled. Useful work = 120 × 9.8 × 3 = 3528 J. Input work = 3528 ÷ 0.75 = 4704 J. Effort = 4704 ÷ 8 = <b>588 N</b>.</p>

<h3>Worked example — bottle opener (2025 Q18)</h3>
<p>Effort 20 N, VR = 16, η = 90%, cap rises 2.5 mm. MA = 0.9 × 16 = 14.4 → load = 14.4 × 20 = 288 N. d<sub>E</sub> = 16 × 2.5 = 40 mm = 0.04 m → work done by the effort = 20 × 0.04 = <b>0.8 J</b>.</p>
`
},
{
  id: 'motion', title: 'Uniformly accelerated motion', group: 'Topic 2 · Machines, mechanisms and control', icon: '🚀',
  blurb: 'The three equations of motion in one dimension, vertical motion, F = ma and apparent weight in lifts.',
  syllabus: [
    'Solve problems with the equations of uniformly accelerated motion in a straight line, one dimension (vertical or horizontal)',
    'v = u + at, v² = u² + 2as, s = ut + ½at²',
    'Dynamics of machines, including apparent weight (unit description)'
  ],
  sim: ['motion'],
  lesson: `
<h3>The equations</h3>
<div class="eq">v = u + at &nbsp;&nbsp;&nbsp; v² = u² + 2as &nbsp;&nbsp;&nbsp; s = ut + ½at²</div>
<p>u = initial velocity, v = final velocity, a = acceleration, s = displacement, t = time. <b>List what you know (3 values) and what you want</b>, then choose the equation that has no unknown you don't need.</p>
<table class="tbl"><tr><th>Missing variable</th><th>Use</th></tr><tr><td>s</td><td>v = u + at</td></tr><tr><td>t</td><td>v² = u² + 2as</td></tr><tr><td>v</td><td>s = ut + ½at²</td></tr></table>
<ul><li>"From rest" / "initially stationary" → u = 0. "Comes to a stop" → v = 0.</li>
<li>Deceleration → a is negative.</li>
<li>Free fall: a = g = 9.8 m/s² (downwards). Choose a positive direction and stick to it.</li>
<li>Convert mm → m, km/h → m/s (÷ 3.6).</li></ul>

<h3>Newton's second law</h3>
<div class="eq">F<sub>net</sub> = m a</div>
<p>Most calculation questions combine motion equations with forces: find a from the motion, then the force (rocket, lift, bucket in a mine shaft); or find a from the forces (friction, incline) then use the motion equations to get distances and times.</p>
<ul><li>Lifting with acceleration a upward: T − mg = ma → <b>T = m(g + a)</b>.</li>
<li>Lowering while accelerating downward: T = m(g − a).</li>
<li><b>Apparent weight</b> = the normal force you feel. In a lift accelerating up you feel heavier: N = m(g + a); accelerating down you feel lighter: N = m(g − a); constant velocity: N = mg.</li></ul>

<h3>Worked example — rocket (2022 Q18)</h3>
<p>2000 kg, from rest to 20 km in 20 s. s = ut + ½at² → 20 000 = ½a(20)² → a = 100 m/s². Thrust − mg = ma → F = 2000(9.8 + 100) = 219 600 N ≈ <b>220 kN</b>.</p>

<h3>Worked example — sliding then stopping</h3>
<p>A 2 kg box leaves a ramp at 4 m/s onto a horizontal surface, μ<sub>k</sub> = 0.35. F<sub>f</sub> = 0.35 × 2 × 9.8 = 6.86 N → a = −6.86 ÷ 2 = −3.43 m/s². Distance to stop: 0 = 4² + 2(−3.43)s → s = <b>2.33 m</b>.</p>
`
},
{
  id: 'friction', title: 'Friction and inclined planes', group: 'Topic 2 · Machines, mechanisms and control', icon: '⛰️',
  blurb: 'Static vs kinetic friction, coefficient of friction, angle of repose and one-body systems on an incline.',
  syllabus: [
    'Recognise that friction is a force opposing motion',
    'Coefficient of friction, normal force, angle of repose: μ<sub>s</sub> = tanθ, F<sub>f</sub> = μF<sub>N</sub>',
    'Distinguish static and kinetic friction: F<sub>f</sub> = μ<sub>s</sub>F<sub>N</sub>, F<sub>f</sub> = μ<sub>k</sub>F<sub>N</sub>',
    'One-body systems on an inclined plane: uniform velocity and uniform acceleration'
  ],
  sim: ['incline'],
  lesson: `
<h3>Friction</h3>
<p><b>Friction</b> is a force that acts parallel to the contact surface and <b>opposes the motion</b> (or the tendency to move) between two surfaces. On a horizontal surface pushed at an angle, friction is still horizontal, opposite to the direction of travel (2025 MC7).</p>
<div class="eq">F<sub>f</sub> = μ F<sub>N</sub></div>
<ul><li><b>Static friction</b> (μ<sub>s</sub>) acts while surfaces are <b>not moving</b> relative to each other. It adjusts to match the applied force up to a maximum μ<sub>s</sub>F<sub>N</sub> ("just about to move" / "on the point of sliding").</li>
<li><b>Kinetic friction</b> (μ<sub>k</sub>) acts once surfaces are <b>sliding</b>. It is roughly constant and usually smaller: μ<sub>k</sub> &lt; μ<sub>s</sub>. That's why it's harder to start something moving than to keep it moving.</li>
<li>μ has no units. It depends on the two surfaces, not on contact area.</li></ul>

<h3>Forces on an incline (angle θ)</h3>
<div class="eq">F<sub>N</sub> = mg cosθ &nbsp;&nbsp;&nbsp; weight component down the slope = mg sinθ</div>
<p>Free-body diagram: weight mg straight down, normal force F<sub>N</sub> perpendicular to the surface, friction F<sub>f</sub> along the surface opposing the (tendency of) motion, plus any applied force.</p>

<h3>Angle of repose</h3>
<p>The <b>angle of repose</b> is the steepest angle at which an object rests on an incline without sliding — the object is <b>just about to slide</b>. There, mg sinθ = μ<sub>s</sub> mg cosθ, so:</p>
<div class="eq">μ<sub>s</sub> = tanθ</div>
<p>Mass cancels: the angle of repose is the same on Mars as on Earth (2020 Q18).</p>
<div class="tip"><b>Describing static and kinetic friction in terms of the angle of repose (2025 Q13, 6 marks):</b><br>
<b>Static:</b> if the incline angle θ is <b>less than or equal to</b> the angle of repose, static friction balances mg sinθ and the object stays at rest; at the angle of repose it is just about to slide (μ<sub>s</sub> = tanθ).<br>
<b>Kinetic:</b> if θ is <b>greater than</b> the angle of repose, mg sinθ exceeds the maximum static friction, the object slides and kinetic friction μ<sub>k</sub>F<sub>N</sub> opposes the motion.<br>
Draw <b>two FBDs</b>: label mg, F<sub>N</sub>, F<sub>f</sub> (up the slope in both cases when the object tends to slide down) and θ.</div>

<h3>Standard incline cases</h3>
<table class="tbl"><tr><th>Situation</th><th>Equation along the slope</th></tr>
<tr><td>Sliding down freely, accelerating</td><td>ma = mg sinθ − μ<sub>k</sub>mg cosθ → <b>a = g(sinθ − μcosθ)</b></td></tr>
<tr><td>Sliding down at constant velocity</td><td>mg sinθ = μ<sub>k</sub>mg cosθ → μ<sub>k</sub> = tanθ</td></tr>
<tr><td>Pushed/pulled UP at constant velocity</td><td>F = mg sinθ + μmg cosθ</td></tr>
<tr><td>Pushed UP and accelerating</td><td>F − mg sinθ − μmg cosθ = ma</td></tr>
<tr><td>Force to just start it moving up</td><td>P = mg sinθ + μ<sub>s</sub>mg cosθ (2020 MC2)</td></tr>
<tr><td>Force to hold it from sliding down</td><td>F = mg sinθ − μ<sub>s</sub>mg cosθ (2022 MC7)</td></tr>
<tr><td>Horizontal surface, sliding</td><td>F<sub>f</sub> = μ<sub>k</sub>mg, deceleration a = μ<sub>k</sub>g</td></tr></table>

<h3>Worked example (2023 Q20)</h3>
<p>A 20 kg trolley is pushed up a 10° incline at uniform velocity with 160 N. Find μ.<br>
160 = mg sin10° + μmg cos10° → 160 = 34.04 + μ(193.0) → μ = 125.96 ÷ 193.0 = <b>0.65</b>.</p>
`
},
{
  id: 'logic', title: 'Logic control', group: 'Topic 2 · Machines, mechanisms and control', icon: '🔀',
  blurb: 'AND, OR, NOT, NAND, NOR, XOR — symbols, truth tables and designing circuits from specifications.',
  syllabus: [
    'Logic gates AND/OR/NOT/NAND/NOR/XOR with standard symbols',
    'Truth tables — logical true, logical false, logical identity, logical negation',
    'Create logic gate circuit diagrams and truth tables from specified conditions (traffic lights, boom gates, thermostats, sun-trackers, solar devices)'
  ],
  sim: ['logic'],
  lesson: `
<h3>Logic levels</h3>
<p><b>1 = logical true</b> (on, HIGH, detected). <b>0 = logical false</b> (off, LOW, not detected). <b>Logical identity</b>: output = input (a buffer, or a wire). <b>Logical negation</b>: output = opposite of input (NOT).</p>

<h3>The six gates</h3>
<div id="gateTable"></div>
<ul><li><b>AND</b> — output 1 only if <b>all</b> inputs are 1.</li>
<li><b>OR</b> — output 1 if <b>at least one</b> input is 1.</li>
<li><b>NOT</b> — inverts: 1 → 0, 0 → 1. (The small circle "bubble" on any symbol means NOT.)</li>
<li><b>NAND</b> — NOT-AND: output 0 only when all inputs are 1.</li>
<li><b>NOR</b> — NOT-OR: output 1 only when all inputs are 0.</li>
<li><b>XOR</b> — exclusive OR: output 1 when inputs are <b>different</b>.</li></ul>
<div class="tip"><b>Describing a gate (2022 Q13, 5 marks):</b> "A NAND gate is an AND gate followed by a NOT. Its output is 0 when and only when all of its inputs are 1; otherwise the output is 1." Then draw the symbol and a full truth table with labelled columns.</div>

<h3>Truth tables</h3>
<ul><li>n inputs → <b>2<sup>n</sup> rows</b> (2 inputs: 4, 3 inputs: 8, 4 inputs: 16).</li>
<li>Count in binary down the rows: the last input column alternates 0,1,0,1…; the next one 0,0,1,1…; the next one 0,0,0,0,1,1,1,1…</li>
<li>For a circuit, add a column for <b>every intermediate signal</b> (each gate's output), working from inputs to output. Label columns to match the diagram (D, E, F…).</li></ul>

<h3>Designing a circuit from conditions</h3>
<ol><li>Identify the <b>inputs</b> (sensors, switches, timers) and give each a letter and what 1 means (e.g. A = 1 when the train is detected).</li>
<li>Identify the <b>output(s)</b> (motor, light, boom gate, alarm).</li>
<li>Translate the words: "<b>and</b>/both" → AND, "<b>or</b>/either" → OR, "<b>not</b>/unless/no" → NOT, "only one of" → XOR.</li>
<li>Draw gates with standard symbols, label inputs, intermediate signals and output.</li>
<li>Check with a truth table.</li></ol>
<div class="tip"><b>Example — ceiling fans (2022 Q16):</b> fans turn on when a swipe card is used (A) AND temperature is above 25 °C (B): F = A · B. Railway boom gate: lower boom if train approaching from the left OR from the right: X = L + R. Solar charger: charge when light detected AND battery NOT full: X = L · F̄.</div>

<h3>Boolean notation (helpful shortcut)</h3>
<p>A·B = A AND B, A + B = A OR B, Ā = NOT A, A ⊕ B = A XOR B. Example: X = Ā + B means NOT A into an OR gate with B (2024 MC5).</p>
`
},
{
  id: 'circuits', title: 'Electrical circuits and power', group: 'Topic 2 · Machines, mechanisms and control', icon: '🔋',
  blurb: 'Series and parallel circuits, Ohm\'s law, electrical power, energy and efficiency. New in the 2025 v1.4 syllabus.',
  syllabus: [
    'Series circuits: R<sub>total</sub> = R₁ + R₂ + …, V<sub>total</sub> = V₁ + V₂ + …, V = IR',
    'Parallel circuits: 1/R<sub>total</sub> = 1/R₁ + 1/R₂ + …, I<sub>total</sub> = I₁ + I₂ + …',
    'Electrical power P = VI and energy E = Pt',
    'Electrical power efficiency η = P<sub>out</sub>/P<sub>in</sub> and energy efficiency η = E<sub>out</sub>/E<sub>in</sub>'
  ],
  sim: ['circuit'],
  lesson: `
<div class="warn">These dot points were added to Unit 4 Topic 2 in the March 2026 syllabus update (v1.4), so <b>none of the 2020–2025 papers test them</b>. Use the practice generator below to get exam-ready.</div>
<h3>Quantities</h3>
<table class="tbl"><tr><th>Quantity</th><th>Symbol</th><th>Unit</th></tr>
<tr><td>Voltage (potential difference)</td><td>V</td><td>volt (V)</td></tr><tr><td>Current</td><td>I</td><td>ampere (A)</td></tr>
<tr><td>Resistance</td><td>R</td><td>ohm (Ω)</td></tr><tr><td>Power</td><td>P</td><td>watt (W)</td></tr><tr><td>Energy</td><td>E</td><td>joule (J)</td></tr></table>
<div class="eq">V = I R</div>

<h3>Series circuits (one path)</h3>
<div class="eq">R<sub>total</sub> = R₁ + R₂ + … &nbsp;&nbsp;&nbsp; V<sub>total</sub> = V₁ + V₂ + … &nbsp;&nbsp;&nbsp; same current I everywhere</div>
<p>Steps: add resistances → I = V<sub>total</sub> ÷ R<sub>total</sub> → each voltage drop V₁ = I R₁. The biggest resistor gets the biggest share of the voltage. If one component fails (open circuit), everything stops.</p>

<h3>Parallel circuits (several branches)</h3>
<div class="eq">1/R<sub>total</sub> = 1/R₁ + 1/R₂ + … &nbsp;&nbsp;&nbsp; I<sub>total</sub> = I₁ + I₂ + … = V/R₁ + V/R₂ + … &nbsp;&nbsp;&nbsp; same voltage across each branch</div>
<p>R<sub>total</sub> is always <b>smaller than the smallest branch</b>. For two resistors: R<sub>total</sub> = R₁R₂ ÷ (R₁ + R₂). Each branch works independently (house wiring, car lights).</p>

<h3>Power and energy</h3>
<div class="eq">P = V I &nbsp;&nbsp;&nbsp; E = P t</div>
<p>Also P = I²R = V²/R (from combining with V = IR). Use <b>t in seconds</b> for joules. (1 kWh = 1000 W × 3600 s = 3.6 MJ.)</p>
<div class="eq">η = P<sub>out</sub> ÷ P<sub>in</sub> × 100% = E<sub>out</sub> ÷ E<sub>in</sub> × 100%</div>

<h3>Worked example</h3>
<p>A 12 V solar battery runs a motor drawing 2.5 A. The motor lifts a 15 kg load 3 m in 20 s. P<sub>in</sub> = 12 × 2.5 = 30 W. P<sub>out</sub> = mgh/t = 15 × 9.8 × 3 ÷ 20 = 22.05 W. η = 22.05 ÷ 30 = <b>73.5%</b>. Energy drawn in 20 s: E = 30 × 20 = 600 J.</p>
`
},
{
  id: 'stress', title: 'Stress–strain diagrams', group: 'Topic 3 · Materials', icon: '📈',
  blurb: 'Reading tensile-test curves: proportional limit, yield, UTS, Young\'s modulus, toughness, ductility, resilience.',
  syllabus: [
    'Used in the learning guide and tested every year (2020–2025): interpreting and sketching stress–strain diagrams for metals and polymers',
    'Selecting materials using features of the diagram'
  ],
  sim: ['stress'],
  lesson: `
<div class="warn">Stress–strain curves aren't a separate Unit 4 dot point, but they are taught in the Unit 4 learning guide (from Units 1–3) and have appeared on <b>every</b> external exam from 2020 to 2025 (e.g. 2025 Q14 and Q16 used them to select polymers).</div>
<h3>Key features (in order along the curve)</h3>
<table class="tbl"><tr><th>Feature</th><th>Meaning</th></tr>
<tr><td><b>Proportional limit</b></td><td>The greatest stress at which stress is still directly proportional to strain (end of the straight line, obeying Hooke's law).</td></tr>
<tr><td><b>Elastic limit</b></td><td>The greatest stress the material can take and still return to its original shape when unloaded.</td></tr>
<tr><td><b>Yield stress (yield point)</b></td><td>Stress where plastic (permanent) deformation begins; mild steel shows a distinct drop/plateau.</td></tr>
<tr><td><b>Ultimate tensile strength (UTS)</b></td><td>The maximum stress — the highest point on the curve. Necking starts here.</td></tr>
<tr><td><b>Fracture (breaking) point</b></td><td>End of the curve where the specimen breaks.</td></tr></table>
<h3>Properties you read from the diagram</h3>
<table class="tbl"><tr><th>Property</th><th>How to see it</th></tr>
<tr><td><b>Stiffness — Young's modulus E</b></td><td>Slope (gradient) of the straight elastic line. Steeper = stiffer. E = stress ÷ strain.</td></tr>
<tr><td><b>Strength</b></td><td>Height of yield point (yield strength) and of the peak (UTS).</td></tr>
<tr><td><b>Ductility</b></td><td>Amount of plastic strain before fracture — how far the curve extends to the right.</td></tr>
<tr><td><b>Toughness</b></td><td>Energy absorbed before fracture = <b>total area under the curve</b>. Needs both strength and ductility.</td></tr>
<tr><td><b>Resilience</b></td><td>Energy stored elastically and released on unloading = area under the elastic part.</td></tr>
<tr><td><b>Brittleness</b></td><td>Little or no plastic region — breaks soon after the elastic limit (e.g. cast iron, glass, high-carbon steel).</td></tr></table>
<div class="tip"><b>Exam technique:</b> when asked to "use two features of the diagram to justify", name the feature AND compare: "Polymer B has the highest yield stress, so it can withstand the greatest stress before deforming plastically; it also has a steep elastic slope (high Young's modulus), so it is stiff."</div>
<div class="tip"><b>Ductility from a tensile test (2021 Q14):</b> measure the original gauge length, pull to fracture, then % elongation = (final length − original length) ÷ original length × 100. On the diagram ductility is the plastic strain from the yield point to fracture.</div>
`
},
{
  id: 'phase', title: 'Lead–tin phase diagrams and the lever rule', group: 'Topic 3 · Materials', icon: '🌡️',
  blurb: 'Eutectic reaction, regions, compositions, hypo/hypereutectic alloys, microstructures and lever-rule calculations.',
  syllabus: [
    'Key features of a lead–tin thermal-equilibrium phase diagram: eutectic reaction (composition and temperature), single- and two-phase regions, chemical composition of phases, hypoeutectic and hypereutectic compositions',
    'Percentages solid and liquid, and composition of solid and liquid, using the lever rule for binary alloys with complete solid insolubility and partial solid solubility'
  ],
  sim: ['phase'],
  lesson: `
<h3>Key values for Pb–Sn</h3>
<table class="tbl"><tr><th>Feature</th><th>Value</th></tr>
<tr><td>Melting point of pure lead (Pb)</td><td>327 °C</td></tr><tr><td>Melting point of pure tin (Sn)</td><td>232 °C</td></tr>
<tr><td><b>Eutectic temperature</b></td><td><b>183 °C</b></td></tr><tr><td><b>Eutectic composition</b></td><td><b>61.9% Sn (38.1% Pb)</b></td></tr>
<tr><td>Max solubility of Sn in α (lead-rich)</td><td>19.2% Sn (≈ 81% Pb) at 183 °C</td></tr>
<tr><td>Max solubility of Pb in β (tin-rich)</td><td>2.5% Pb (97.5% Sn) at 183 °C</td></tr></table>
<p>Read the axis carefully: some papers use % Sn, others (2024/2025) use <b>% Pb</b>, which flips the diagram left–right.</p>

<h3>Lines and regions</h3>
<ul><li><b>Liquidus</b> — above it the alloy is all liquid (L). Runs from each pure metal's melting point down to the eutectic point.</li>
<li><b>Solidus</b> — below it the alloy is all solid.</li>
<li><b>Solvus</b> — limit of solid solubility; below it α rejects Sn (or β rejects Pb).</li>
<li><b>Eutectic line</b> — horizontal at 183 °C.</li>
<li>Single-phase regions: <b>L, α, β</b>. Two-phase regions: <b>α + L, β + L</b> (mushy zones), <b>α + β</b>.</li></ul>

<h3>The eutectic reaction</h3>
<div class="eq">L (61.9% Sn) → α (19.2% Sn) + β (97.5% Sn) &nbsp; at 183 °C on cooling</div>
<p>The eutectic alloy solidifies instantly at one temperature (no mushy zone), has the lowest melting point (great for solder), and forms a <b>lamellar</b> structure of alternating thin α and β layers.</p>
<ul><li><b>Hypoeutectic</b> (19.2–61.9% Sn, the lead-rich side): primary (pro-eutectic) α grains surrounded by eutectic (α + β lamellae).</li>
<li><b>Hypereutectic</b> (61.9–97.5% Sn): primary β grains + eutectic.</li>
<li>Below 19.2% Sn: solidifies as α; on cooling past the solvus, small β particles precipitate inside/at the α grains (2025 Q11a: 10% Sn at 100 °C → α grains with β precipitates).</li></ul>

<h3>Lever rule — step by step</h3>
<ol><li>Locate the point (alloy composition C₀, temperature T). It must be in a <b>two-phase</b> region.</li>
<li>Draw the horizontal <b>tie line</b> through it to the boundaries on each side.</li>
<li>Read the compositions at each end: those are the <b>compositions of the two phases</b> (e.g. C<sub>α</sub> on the solidus, C<sub>L</sub> on the liquidus).</li>
<li>Use the <b>opposite</b> lever arm for each proportion:</li></ol>
<div class="eq">% liquid = (C₀ − C<sub>α</sub>) ÷ (C<sub>L</sub> − C<sub>α</sub>) × 100 &nbsp;&nbsp;&nbsp; % solid = (C<sub>L</sub> − C₀) ÷ (C<sub>L</sub> − C<sub>α</sub>) × 100</div>
<p class="mnemo">The phase you're <b>closer to</b> is the one you have <b>more of</b>.</p>
<p>In a single-phase region there is nothing to calculate: 100% of that phase, with the composition of the alloy.</p>

<h3>Complete solid insolubility (metals A and B)</h3>
<p>Some exam diagrams show two metals that don't dissolve in each other at all (2020 Q21, 2021 Q18). The "solid" phases are <b>pure A</b> (0% B) and <b>pure B</b> (100% B) — the tie line runs to the vertical axis. Example: 20% A–80% B in the B + L region where the liquidus is at 60% B: % solid B = (80 − 60) ÷ (100 − 60) = 50%; % liquid = 50%; solid composition = 100% B, liquid composition = 60% B.</p>

<h3>Worked example (2025 Q19b, % Pb axis)</h3>
<p>60% Pb at 200 °C lies in α + L. The official answer reads the tie line as liquid = 45% Pb and solid α = 83% Pb.<br>% solid = (60 − 45) ÷ (83 − 45) = 15 ÷ 38 = <b>39%</b>; % liquid = (83 − 60) ÷ (83 − 45) = 23 ÷ 38 = <b>61%</b>.<br>Marks: 1 for annotating the 60% Pb / 200 °C point and tie line on the diagram, 1 each for the two percentages.</p>
`
},
{
  id: 'steel', title: 'Iron–carbon steels and heat treatment', group: 'Topic 3 · Materials', icon: '🔥',
  blurb: 'Ferrite, cementite, pearlite, austenite; low/medium/high carbon uses; working, annealing, normalising, hardening, tempering.',
  syllabus: [
    'Microstructures of the steel portion of the Fe–C diagram (≤ 2.1% C): austenite, cementite, ferrite, pearlite for eutectoid, hypoeutectoid and hypereutectoid steel',
    'Chemical composition → properties → uses: low (0.07–0.30%), medium (0.30–0.60%), high (0.60–2.0%) carbon steel',
    'Effects of hot and cold working (rolling, forging), full and process annealing, normalising, hardening (water/oil/air/furnace cooling, martensite, cooling rate for 0.83% C), tempering'
  ],
  sim: ['steel'],
  lesson: `
<h3>The four phases/structures</h3>
<table class="tbl"><tr><th>Name</th><th>What it is</th><th>Properties</th></tr>
<tr><td><b>Ferrite (α)</b></td><td>Almost pure iron (BCC), holds max ~0.02% C</td><td>Soft, ductile, tough, magnetic</td></tr>
<tr><td><b>Cementite (Fe₃C)</b></td><td>Iron carbide, 6.67% C</td><td>Very hard, brittle, wear resistant</td></tr>
<tr><td><b>Pearlite</b></td><td>Lamellar (layered) mixture of ferrite + cementite, forms from austenite at 0.83% C, 723 °C</td><td>Stronger and harder than ferrite, still reasonably tough</td></tr>
<tr><td><b>Austenite (γ)</b></td><td>FCC iron that dissolves up to 2.1% C; only stable at high temperature (above ~723 °C) in plain carbon steel</td><td>Soft, ductile, non-magnetic — ideal for hot working</td></tr></table>

<h3>The eutectoid reaction</h3>
<div class="eq">Austenite (0.83% C) → Pearlite (ferrite + cementite) &nbsp; at 723 °C on slow cooling</div>
<table class="tbl"><tr><th>Steel</th><th>Carbon</th><th>Room-temperature microstructure</th></tr>
<tr><td><b>Hypoeutectoid</b></td><td>&lt; 0.83%</td><td><b>Pro-eutectoid ferrite</b> (light grains) + pearlite. More carbon → more pearlite.</td></tr>
<tr><td><b>Eutectoid</b></td><td>0.83%</td><td>100% pearlite</td></tr>
<tr><td><b>Hypereutectoid</b></td><td>0.83–2.1%</td><td>Pearlite + <b>pro-eutectoid cementite</b> as a thin network around the grain boundaries</td></tr></table>
<p>Cooling of a hypoeutectoid steel: austenite → (crosses A₃ line) ferrite starts forming at the γ grain boundaries → at 723 °C the remaining austenite (now 0.83% C) turns into pearlite.</p>
<div class="tip"><b>Sketch tip (2023 Q15):</b> draw a circle "microscope view". Medium-carbon steel ≈ half light ferrite grains, half pearlite grains drawn with parallel stripes. Label <b>ferrite</b> and <b>pearlite</b> with arrows. For high carbon: mostly striped pearlite with thick dark lines at the boundaries labelled <b>cementite</b>.</div>

<h3>Carbon content → properties → uses</h3>
<table class="tbl"><tr><th>Class</th><th>% C</th><th>Structure &amp; properties</th><th>Uses (syllabus list)</th></tr>
<tr><td><b>Low-carbon (mild)</b></td><td>0.07–0.30</td><td>Mostly ferrite: soft, very ductile and malleable, tough, easily welded and formed, can't be hardened by quenching</td><td>Car body parts, wire products, structural plates and sections, seamless tubes, boiler plate</td></tr>
<tr><td><b>Medium-carbon</b></td><td>0.30–0.60</td><td>Ferrite + more pearlite: balance of strength, toughness and wear resistance; can be heat treated</td><td>Shafts, axles, gears, crankshafts, stampings and forgings, train rails, wheels and axles</td></tr>
<tr><td><b>High-carbon</b></td><td>0.60–2.0</td><td>Pearlite (+ cementite above 0.83%): hardest, strongest, most wear resistant, but less ductile and more brittle</td><td>High-strength springs and wires, cutting tools, punches, dies, industrial knives</td></tr></table>
<div class="tip"><b>Linking composition → microstructure → property → application</b> is how full marks are earned: "Mild steel (0.07–0.3% C) is mostly ferrite, which is soft and ductile, so it can be drawn and formed into seamless tubes without cracking." (2024 Q14)</div>

<h3>Processing and heat treatment</h3>
<table class="tbl"><tr><th>Process</th><th>What happens</th><th>Effect on grains / properties</th></tr>
<tr><td><b>Hot working</b> (rolling, forging above recrystallisation temp.)</td><td>Shaped while austenitic</td><td>Grains recrystallise as they deform → fine, equiaxed grains, no work hardening; good toughness; scale on surface</td></tr>
<tr><td><b>Cold working</b> (rolling, drawing at room temp.)</td><td>Grains distorted and elongated in the working direction</td><td>Work hardening: harder, stronger, less ductile; better surface finish and accuracy; internal stresses</td></tr>
<tr><td><b>Full annealing</b></td><td>Heat ~30–50 °C above upper critical (A₃) to austenite, <b>cool very slowly in the furnace</b></td><td>Coarse pearlite + ferrite: softest, most ductile, stress free</td></tr>
<tr><td><b>Process annealing</b></td><td>Heat cold-worked low-C steel <b>below</b> 723 °C (~550–650 °C), cool in air</td><td>Distorted ferrite grains recrystallise → ductility restored so cold working can continue</td></tr>
<tr><td><b>Normalising</b></td><td>Heat above upper critical, <b>cool in still air</b></td><td>Finer, more uniform pearlite than annealing: stronger and tougher, refines grains after forging</td></tr>
<tr><td><b>Hardening</b></td><td>Heat to austenite, <b>quench</b> (water fastest, then oil, then air)</td><td>Carbon is trapped → <b>martensite</b>: very hard, brittle, needle-like structure</td></tr>
<tr><td><b>Tempering</b></td><td>Reheat hardened steel to 200–650 °C, cool</td><td><b>Tempered martensite</b>: some hardness traded for toughness; less brittle; relieves stress</td></tr></table>
<h3>Cooling rate for eutectoid steel (0.83% C)</h3>
<table class="tbl"><tr><th>Cooling</th><th>Rate</th><th>Structure</th><th>Hardness</th></tr>
<tr><td>Furnace cooled</td><td>Slowest</td><td>Coarse pearlite</td><td>Softest</td></tr>
<tr><td>Air cooled</td><td>Slow</td><td>Fine pearlite</td><td>↑</td></tr>
<tr><td>Oil quenched</td><td>Fast</td><td>Martensite (+ some very fine pearlite)</td><td>↑↑</td></tr>
<tr><td>Water quenched</td><td>Fastest</td><td>Martensite</td><td>Hardest, most brittle (risk of cracking)</td></tr></table>
<p><b>Martensitic reaction</b>: when cooling is faster than the critical cooling rate, carbon can't diffuse out to form pearlite, so austenite shears directly into a distorted, carbon-supersaturated structure (martensite). It is diffusionless and instant.</p>
<h3>Cast iron (beyond 2.1% C)</h3>
<p>Cast irons (2.1–4.5% C) pass through the eutectic at 1147 °C (austenite + cementite, "ledeburite"). Cooling between eutectic and eutectoid temperatures, carbon is rejected from austenite as cementite (or graphite flakes in grey cast iron); at 723 °C the austenite turns to pearlite. Hard, brittle, good in compression, easily cast (2021 Q13).</p>
`
},
{
  id: 'plastics', title: 'Engineering plastics', group: 'Topic 3 · Materials', icon: '🧪',
  blurb: 'ABS, polycarbonate and nylon 6 — properties and uses (plus PE, PP, PVC and PLA from past papers).',
  syllabus: [
    'ABS: high heat resistance, good low-temperature resistance, high impact resistance, high chemical resistance, excellent electrical insulation, good dimensional stability',
    'Polycarbonate (PC): high transparency, good toughness, high impact strength, good chemical resistance, high heat resistance, good electrical properties, high dimensional stability',
    'Polyamide (PA6/nylon 6): high strength, high abrasion resistance, good thermal resistance, good chemical resistance, good electrical properties, good fatigue resistance'
  ],
  lesson: `
<h3>Syllabus plastics</h3>
<table class="tbl"><tr><th>Plastic</th><th>Key properties (syllabus wording)</th><th>Current uses</th></tr>
<tr><td><b>ABS</b><br>acrylonitrile butadiene styrene</td><td>High heat resistance, good low-temperature resistance, <b>high impact resistance</b>, high chemical resistance, excellent electrical insulation, good dimensional stability</td><td>Automobile parts; PPE — face shields, <b>hard hats, helmets</b>; electrical equipment housings — <b>power tools, printers, vacuum cleaners</b>; high-strength construction applications</td></tr>
<tr><td><b>Polycarbonate (PC)</b></td><td><b>High transparency</b>, good toughness, high impact strength, good chemical resistance, high heat resistance, good electrical properties, high dimensional stability</td><td>Lenses and shields — automotive headlamps, security windows, motorcycle visors and windscreens, prescription lenses, safety glasses, machinery guards, skylights, streetlamps; electronic device housings</td></tr>
<tr><td><b>Polyamide (PA6 / nylon 6)</b></td><td>High strength, <b>high abrasion resistance</b>, good thermal resistance, good chemical resistance, good electrical properties, <b>good fatigue resistance</b></td><td>Machine parts — <b>gears, rollers, guides, bearings, wear pads, wheels</b>; medical implants; electrical connectors; fishing line</td></tr></table>
<div class="tip"><b>Matching a property to a use:</b> always say <i>why</i> the property matters. "Nylon 6 is used for gears because its high abrasion resistance means teeth wear slowly, and its good fatigue resistance means it survives millions of repeated loading cycles."</div>

<h3>Other plastics in 2020–2025 papers</h3>
<table class="tbl"><tr><th>Plastic</th><th>Properties</th><th>Typical uses</th></tr>
<tr><td><b>Polyethylene (PE)</b></td><td>Excellent electrical insulator, tough, flexible, moisture and chemical resistant, cheap</td><td>Cable insulation (2020 MC4), food containers, bottles, pipes</td></tr>
<tr><td><b>Polypropylene (PP)</b></td><td>Excellent chemical resistance, higher heat resistance than PE, tough, fatigue resistant (living hinges)</td><td>Lab beakers (2023 MC1), car bumpers, containers, hinged lids</td></tr>
<tr><td><b>PVC</b></td><td>Rigid, durable, chemically resistant, cheap, weather resistant</td><td>Drainage and wastewater pipes (2022 MC2), window frames</td></tr>
<tr><td><b>Polylactic acid (PLA)</b></td><td>Biodegradable, biocompatible, non-toxic, made from plant starch</td><td>Medical implants, screws, sutures (2024 MC4, 2025 MC5), 3D printing</td></tr></table>
`
}
];

// Formula book summary (matches syllabus formulas)
export const FORMULAS = [
  { g: 'Machines', items: [
    ['Mechanical advantage', 'MA = load ÷ effort = F<sub>L</sub> ÷ F<sub>E</sub>'],
    ['Velocity ratio', 'VR = distance moved by effort ÷ distance moved by load = d<sub>E</sub> ÷ d<sub>L</sub>'],
    ['VR of screws', 'VR = circumference ÷ pitch = 2πr ÷ P'],
    ['Pulleys', 'VR = number of ropes supporting the load'],
    ['Belts', 'VR = driven size ÷ driver size (radius, diameter or circumference) = input speed ÷ output speed'],
    ['Gears', 'GR or VR = teeth (or size) of driven ÷ driver = angular movement of driver ÷ angular movement of driven'],
    ['Efficiency', 'η = useful output ÷ input × 100% = MA ÷ VR × 100%']]},
  { g: 'Work, energy and power', items: [
    ['Work', 'W = F s'], ['Power', 'P = W ÷ t'], ['Kinetic energy', 'KE = ½ m v²'], ['Potential energy', 'PE = m g h'],
    ['Weight', 'F = m g &nbsp;(g = 9.8 m/s²)'], ['Newton\'s 2nd law', 'F = m a']]},
  { g: 'Motion', items: [
    ['', 'v = u + a t'], ['', 'v² = u² + 2 a s'], ['', 's = u t + ½ a t²']]},
  { g: 'Friction', items: [
    ['Angle of repose', 'μ<sub>s</sub> = tan θ'], ['Friction', 'F<sub>f</sub> = μ F<sub>N</sub>'],
    ['Static / kinetic', 'F<sub>f</sub> = μ<sub>s</sub> F<sub>N</sub> &nbsp;&nbsp; F<sub>f</sub> = μ<sub>k</sub> F<sub>N</sub>'],
    ['On an incline', 'F<sub>N</sub> = mg cos θ &nbsp;&nbsp; component down slope = mg sin θ']]},
  { g: 'Electrical', items: [
    ['Ohm\'s law', 'V = I R'], ['Series', 'R<sub>total</sub> = R₁ + R₂ + … &nbsp;&nbsp; V<sub>total</sub> = V₁ + V₂ + …'],
    ['Parallel', '1/R<sub>total</sub> = 1/R₁ + 1/R₂ + … &nbsp;&nbsp; I<sub>total</sub> = I₁ + I₂ + … = V/R₁ + V/R₂ + …'],
    ['Power', 'P = V I'], ['Energy', 'E = P t'],
    ['Efficiency', 'η = P<sub>out</sub> ÷ P<sub>in</sub> × 100% = E<sub>out</sub> ÷ E<sub>in</sub> × 100%']]},
  { g: 'Materials', items: [
    ['Lever rule — % liquid', '(C₀ − C<sub>solid</sub>) ÷ (C<sub>liquid</sub> − C<sub>solid</sub>) × 100'],
    ['Lever rule — % solid', '(C<sub>liquid</sub> − C₀) ÷ (C<sub>liquid</sub> − C<sub>solid</sub>) × 100'],
    ['Stress / strain', 'σ = F ÷ A &nbsp;&nbsp; ε = ΔL ÷ L₀ &nbsp;&nbsp; E = σ ÷ ε'],
    ['Pb–Sn eutectic', '183 °C, 61.9% Sn (38.1% Pb)'], ['Fe–C eutectoid', '723 °C, 0.83% C']]}
];

// ---------- Practice generators: each returns {q, a, unit, tol, work} ----------
const r = (a, b, s = 1) => Math.round((a + Math.random() * (b - a)) / s) * s;
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const f = (x, d = 2) => Number(x.toFixed(d));
const G = 9.8, rad = d => d * Math.PI / 180;

export const GENERATORS = {
  mech: [
    () => { const L = r(200, 1200, 10), E = r(40, 200, 5); const ma = L / E;
      return { q: `A lever lifts a ${L} N load with an effort of ${E} N. Calculate the MA.`, a: f(ma), unit: '', work: `MA = F<sub>L</sub> ÷ F<sub>E</sub> = ${L} ÷ ${E} = ${f(ma)}` }; },
    () => { const n = r(2, 6), m = r(20, 150, 5), eff = r(60, 95, 5); const FL = m * G, FE = FL / (n * eff / 100);
      return { q: `A pulley system has ${n} ropes supporting a ${m} kg load and is ${eff}% efficient. Calculate the effort force.`, a: f(FE, 1), unit: 'N', tol: 0.02, work: `VR = ${n}; MA = η × VR = ${eff / 100} × ${n} = ${f(n * eff / 100)}<br>F<sub>L</sub> = ${m} × 9.8 = ${f(FL, 1)} N<br>F<sub>E</sub> = F<sub>L</sub> ÷ MA = ${f(FE, 1)} N` }; },
    () => { const rr = r(150, 450, 10), P = pick([2, 2.5, 3, 4, 5, 6]); const vr = 2 * Math.PI * rr / P;
      return { q: `A screw jack has a lever arm of radius ${rr} mm and a thread pitch of ${P} mm. Calculate the VR.`, a: f(vr, 1), unit: '', tol: 0.01, work: `VR = 2πr ÷ P = 2π × ${rr} ÷ ${P} = ${f(vr, 1)}` }; },
    () => { const t1 = r(10, 30), t2 = r(35, 90), rpm = r(300, 1500, 50); const out = rpm * t1 / t2;
      return { q: `A ${t1}-tooth driver gear turning at ${rpm} rpm meshes with a ${t2}-tooth driven gear. Find the output speed.`, a: f(out, 1), unit: 'rpm', tol: 0.01, work: `GR = ${t2} ÷ ${t1} = ${f(t2 / t1, 3)}<br>Output = ${rpm} ÷ ${f(t2 / t1, 3)} = ${f(out, 1)} rpm` }; },
    () => { const T = r(30, 80), s = pick([1, 2]), rpm = r(600, 1800, 100); const out = rpm * s / T;
      return { q: `A ${s === 1 ? 'single' : 'double'}-start worm turning at ${rpm} rpm drives a ${T}-tooth worm wheel. Find the wheel speed.`, a: f(out, 2), unit: 'rpm', tol: 0.01, work: `VR = teeth ÷ starts = ${T} ÷ ${s} = ${T / s}<br>Wheel speed = ${rpm} ÷ ${T / s} = ${f(out, 2)} rpm` }; },
    () => { const d1 = r(80, 200, 10), d2 = r(220, 500, 10), rpm = r(500, 2000, 100);
      return { q: `A belt drive has a driver pulley of diameter ${d1} mm and a driven pulley of radius ${d2 / 2} mm. The driver turns at ${rpm} rpm. Find the driven pulley speed.`, a: f(rpm * d1 / d2, 1), unit: 'rpm', tol: 0.01, work: `Driven diameter = 2 × ${d2 / 2} = ${d2} mm<br>VR = ${d2} ÷ ${d1} = ${f(d2 / d1, 3)}<br>Output = ${rpm} ÷ ${f(d2 / d1, 3)} = ${f(rpm * d1 / d2, 1)} rpm` }; },
    () => { const FE = r(20, 80), FL = r(200, 600, 10), de = r(300, 900, 10), dl = r(10, 40); const ma = FL / FE, vr = de / dl;
      return { q: `A crowbar: an effort of ${FE} N moves ${de} mm to raise a ${FL} N load by ${dl} mm. Calculate the efficiency (%).`, a: f(ma / vr * 100, 1), unit: '%', tol: 0.01, work: `MA = ${FL} ÷ ${FE} = ${f(ma, 2)}<br>VR = ${de} ÷ ${dl} = ${f(vr, 2)}<br>η = MA ÷ VR × 100 = ${f(ma / vr * 100, 1)}%` }; },
    () => { const pT = r(40, 54), rT = r(12, 28), d = r(620, 740, 5), turns = r(2, 10);
      const dist = turns * pT / rT * Math.PI * d / 1000;
      return { q: `A bicycle has a ${pT}-tooth pedal sprocket and a ${rT}-tooth rear sprocket. The wheel diameter is ${d} mm. How far does the bike travel for ${turns} pedal turns? (m)`, a: f(dist, 2), unit: 'm', tol: 0.01, work: `Wheel turns per pedal turn = ${pT} ÷ ${rT} = ${f(pT / rT, 3)}<br>Wheel turns = ${turns} × ${f(pT / rT, 3)} = ${f(turns * pT / rT, 3)}<br>Distance = turns × πd = ${f(turns * pT / rT, 3)} × π × ${d / 1000} = ${f(dist, 2)} m` }; }
  ],
  energy: [
    () => { const m = r(10, 2000, 5), h = r(2, 40); const pe = m * G * h;
      return { q: `Calculate the potential energy gained when a ${m} kg load is raised ${h} m.`, a: f(pe, 0), unit: 'J', tol: 0.01, work: `PE = mgh = ${m} × 9.8 × ${h} = ${f(pe, 0)} J` }; },
    () => { const m = r(2, 1500, 1), v = r(2, 30); const ke = 0.5 * m * v * v;
      return { q: `Calculate the kinetic energy of a ${m} kg object moving at ${v} m/s.`, a: f(ke, 0), unit: 'J', tol: 0.01, work: `KE = ½mv² = 0.5 × ${m} × ${v}² = ${f(ke, 0)} J` }; },
    () => { const m = r(50, 1500, 10), h = r(2, 30), t = r(5, 60); const p = m * G * h / t;
      return { q: `A motor lifts ${m} kg vertically ${h} m in ${t} s at constant velocity. Calculate the useful power output.`, a: f(p, 1), unit: 'W', tol: 0.01, work: `W = mgh = ${m} × 9.8 × ${h} = ${f(m * G * h, 0)} J<br>P = W ÷ t = ${f(m * G * h, 0)} ÷ ${t} = ${f(p, 1)} W` }; },
    () => { const h = r(2, 50); const v = Math.sqrt(2 * G * h);
      return { q: `An object is dropped from ${h} m. Ignoring air resistance, find its speed just before it hits the ground.`, a: f(v, 2), unit: 'm/s', tol: 0.01, work: `mgh = ½mv² → v = √(2gh) = √(2 × 9.8 × ${h}) = ${f(v, 2)} m/s` }; },
    () => { const L = r(500, 20000, 500), h = r(5, 60), t = pick([60, 3600]), Pin = r(2000, 9000, 50); const out = L * G * h / t;
      return { q: `A pump lifts ${L} L of water ${h} m every ${t === 60 ? 'minute' : 'hour'}. The motor uses ${Pin} W. Calculate the efficiency (%). (1 L = 1 kg)`, a: f(out / Pin * 100, 1), unit: '%', tol: 0.02, work: `Useful power = mgh ÷ t = ${L} × 9.8 × ${h} ÷ ${t} = ${f(out, 1)} W<br>η = ${f(out, 1)} ÷ ${Pin} × 100 = ${f(out / Pin * 100, 1)}%` }; },
    () => { const F = r(20, 500, 5), s = r(2, 40); return { q: `A ${F} N force pushes a crate ${s} m along the floor in the direction of the force. Calculate the work done.`, a: F * s, unit: 'J', work: `W = Fs = ${F} × ${s} = ${F * s} J` }; }
  ],
  motion: [
    () => { const u = r(0, 10), a = r(1, 6, 0.5), t = r(2, 12); const v = u + a * t;
      return { q: `A cart starts at ${u} m/s and accelerates at ${a} m/s² for ${t} s. Find its final velocity.`, a: f(v, 2), unit: 'm/s', work: `v = u + at = ${u} + ${a} × ${t} = ${f(v, 2)} m/s` }; },
    () => { const u = r(10, 30), s = r(10, 80); const a = -u * u / (2 * s);
      return { q: `A vehicle travelling at ${u} m/s brakes uniformly and stops in ${s} m. Find the deceleration (give a positive value).`, a: f(-a, 2), unit: 'm/s²', tol: 0.01, work: `v² = u² + 2as → 0 = ${u}² + 2a(${s}) → a = −${f(-a, 2)} m/s²` }; },
    () => { const a = r(0.5, 4, 0.5), t = r(3, 15); const s = 0.5 * a * t * t;
      return { q: `From rest, a conveyor package accelerates at ${a} m/s² for ${t} s. How far does it travel?`, a: f(s, 2), unit: 'm', work: `s = ut + ½at² = 0 + 0.5 × ${a} × ${t}² = ${f(s, 2)} m` }; },
    () => { const m = r(200, 3000, 50), a = r(0.5, 3, 0.5); const T = m * (G + a);
      return { q: `A ${m} kg lift accelerates upward at ${a} m/s². Calculate the cable tension.`, a: f(T, 0), unit: 'N', tol: 0.01, work: `T − mg = ma → T = m(g + a) = ${m}(9.8 + ${a}) = ${f(T, 0)} N` }; },
    () => { const v = r(5, 30), s = r(5, 100); const a = v * v / (2 * s);
      return { q: `A rod starts from rest and reaches ${v} m/s after ${s} m. Find its acceleration.`, a: f(a, 2), unit: 'm/s²', tol: 0.01, work: `v² = u² + 2as → ${v}² = 0 + 2a(${s}) → a = ${f(a, 2)} m/s²` }; }
  ],
  friction: [
    () => { const mu = r(0.15, 0.9, 0.01); const th = Math.atan(mu) * 180 / Math.PI;
      return { q: `An object is just about to slide on an incline. μ<sub>s</sub> = ${mu}. Find the angle of repose (°).`, a: f(th, 1), unit: '°', tol: 0.01, work: `μ<sub>s</sub> = tanθ → θ = tan⁻¹(${mu}) = ${f(th, 1)}°` }; },
    () => { const th = r(10, 40), m = r(5, 200), mu = r(0.1, 0.35, 0.05); const a = G * (Math.sin(rad(th)) - mu * Math.cos(rad(th)));
      return { q: `A ${m} kg box slides down a ${th}° slope, μ<sub>k</sub> = ${mu}. Find its acceleration.`, a: f(a, 2), unit: 'm/s²', tol: 0.02, work: `a = g(sinθ − μcosθ) = 9.8(sin${th}° − ${mu} × cos${th}°) = ${f(a, 2)} m/s² (mass cancels)` }; },
    () => { const th = r(10, 35), m = r(10, 300, 5), mu = r(0.1, 0.6, 0.05); const F = m * G * (Math.sin(rad(th)) + mu * Math.cos(rad(th)));
      return { q: `A ${m} kg crate is pushed up a ${th}° ramp at constant velocity, μ = ${mu}. Find the push force parallel to the ramp.`, a: f(F, 1), unit: 'N', tol: 0.01, work: `F = mg sinθ + μmg cosθ<br>= ${m}×9.8×sin${th}° + ${mu}×${m}×9.8×cos${th}°<br>= ${f(m * G * Math.sin(rad(th)), 1)} + ${f(mu * m * G * Math.cos(rad(th)), 1)} = ${f(F, 1)} N` }; },
    () => { const m = r(500, 2000, 10), mu = r(0.4, 0.9, 0.05); const Ff = mu * m * G;
      return { q: `A ${m} kg car skids on a level road, μ<sub>k</sub> = ${mu}. Find the kinetic friction force.`, a: f(Ff, 0), unit: 'N', tol: 0.01, work: `F<sub>f</sub> = μ<sub>k</sub>mg = ${mu} × ${m} × 9.8 = ${f(Ff, 0)} N` }; },
    () => { const m = r(500, 2000, 50), th = r(5, 30); const N = m * G * Math.cos(rad(th));
      return { q: `A ${m} kg vehicle is parked on a ${th}° slope. Calculate the normal force.`, a: f(N, 0), unit: 'N', tol: 0.01, work: `F<sub>N</sub> = mg cosθ = ${m} × 9.8 × cos${th}° = ${f(N, 0)} N` }; }
  ],
  circuits: [
    () => { const R1 = r(10, 200, 5), R2 = r(10, 200, 5), V = pick([6, 9, 12, 24]); const I = V / (R1 + R2);
      return { q: `R₁ = ${R1} Ω and R₂ = ${R2} Ω are in <b>series</b> with a ${V} V supply. Find the voltage across R₁.`, a: f(I * R1, 2), unit: 'V', tol: 0.01, work: `R<sub>total</sub> = ${R1} + ${R2} = ${R1 + R2} Ω<br>I = V ÷ R = ${V} ÷ ${R1 + R2} = ${f(I, 4)} A<br>V₁ = IR₁ = ${f(I, 4)} × ${R1} = ${f(I * R1, 2)} V` }; },
    () => { const R1 = r(10, 200, 5), R2 = r(10, 200, 5); const Rt = R1 * R2 / (R1 + R2);
      return { q: `R₁ = ${R1} Ω and R₂ = ${R2} Ω are in <b>parallel</b>. Find the total resistance.`, a: f(Rt, 2), unit: 'Ω', tol: 0.01, work: `1/R<sub>t</sub> = 1/${R1} + 1/${R2} → R<sub>t</sub> = ${f(Rt, 2)} Ω` }; },
    () => { const R1 = r(10, 100, 5), R2 = r(10, 100, 5), V = pick([6, 9, 12, 24]); const I = V / R1 + V / R2;
      return { q: `R₁ = ${R1} Ω and R₂ = ${R2} Ω are in <b>parallel</b> across ${V} V. Find the total current.`, a: f(I, 3), unit: 'A', tol: 0.01, work: `I₁ = ${V}/${R1} = ${f(V / R1, 3)} A, I₂ = ${V}/${R2} = ${f(V / R2, 3)} A<br>I<sub>total</sub> = ${f(I, 3)} A` }; },
    () => { const V = pick([12, 24, 230, 240]), I = r(0.5, 10, 0.5), t = r(1, 60); const E = V * I * t * 60;
      return { q: `A ${V} V motor draws ${I} A for ${t} minutes. Calculate the electrical energy used (J).`, a: f(E, 0), unit: 'J', tol: 0.01, work: `P = VI = ${V} × ${I} = ${f(V * I, 1)} W<br>E = Pt = ${f(V * I, 1)} × ${t * 60} s = ${f(E, 0)} J` }; },
    () => { const V = pick([12, 24]), I = r(1, 8, 0.5), m = r(5, 40), h = r(1, 5), t = r(5, 30); const pin = V * I, pout = m * G * h / t;
      if (pout >= pin) return GENERATORS.circuits[0]();
      return { q: `A ${V} V motor drawing ${I} A lifts ${m} kg through ${h} m in ${t} s. Find the efficiency (%).`, a: f(pout / pin * 100, 1), unit: '%', tol: 0.01, work: `P<sub>in</sub> = VI = ${f(pin, 1)} W<br>P<sub>out</sub> = mgh/t = ${m}×9.8×${h}÷${t} = ${f(pout, 2)} W<br>η = ${f(pout / pin * 100, 1)}%` }; }
  ],
  phase: [
    () => { const Cs = r(15, 25), Cl = r(45, 60), C0 = r(Cs + 3, Cl - 3);
      return { q: `In an α + L region a tie line gives α at ${Cs}% Sn and liquid at ${Cl}% Sn. For an alloy of ${C0}% Sn, find the % liquid.`, a: f((C0 - Cs) / (Cl - Cs) * 100, 1), unit: '%', tol: 0.01, work: `% L = (C₀ − C<sub>α</sub>) ÷ (C<sub>L</sub> − C<sub>α</sub>) × 100 = (${C0} − ${Cs}) ÷ (${Cl} − ${Cs}) × 100 = ${f((C0 - Cs) / (Cl - Cs) * 100, 1)}%` }; },
    () => { const Cl = r(40, 70), C0 = r(Cl + 5, 95);
      return { q: `Metals A and B are completely insoluble in the solid state. At some temperature the liquid contains ${Cl}% B and the solid is pure B. For an alloy with ${C0}% B, find the % solid.`, a: f((C0 - Cl) / (100 - Cl) * 100, 1), unit: '%', tol: 0.01, work: `Solid = pure B (100% B)<br>% solid = (C₀ − C<sub>L</sub>) ÷ (100 − C<sub>L</sub>) × 100 = (${C0} − ${Cl}) ÷ (100 − ${Cl}) × 100 = ${f((C0 - Cl) / (100 - Cl) * 100, 1)}%` }; },
    () => { const C0 = r(25, 55); const pa = (61.9 - C0) / (61.9 - 19.2) * 100;
      return { q: `A ${C0}% Sn alloy is cooled to just above 183 °C (α at 19.2% Sn, liquid at 61.9% Sn). What % is primary α?`, a: f(pa, 1), unit: '%', tol: 0.01, work: `% α = (C<sub>L</sub> − C₀) ÷ (C<sub>L</sub> − C<sub>α</sub>) = (61.9 − ${C0}) ÷ (61.9 − 19.2) × 100 = ${f(pa, 1)}%. (The remaining liquid becomes eutectic.)` }; }
  ]
};

// Concept flash-quiz (multiple choice, written for this site)
export const CONCEPT_QUIZ = [
  { t: 'mech', q: 'A wheelbarrow is which order of lever?', o: ['1st', '2nd', '3rd', 'Not a lever'], a: 1 },
  { t: 'mech', q: 'Tweezers are a 3rd order lever. Their MA is…', o: ['always > 1', 'always = 1', 'always < 1', 'always 0'], a: 2 },
  { t: 'mech', q: 'Which mechanism converts rotary motion to linear motion?', o: ['Worm and wheel', 'Rack and pinion', 'Spur gears', 'Idler gear'], a: 1 },
  { t: 'mech', q: 'Adding an idler gear between two spur gears…', o: ['doubles the GR', 'halves the GR', 'reverses the output direction and keeps the GR the same', 'stops the system'], a: 2 },
  { t: 'mech', q: 'A key advantage of a worm drive in a lift is that it…', o: ['is 100% efficient', 'is self-locking', 'increases output speed', 'has no friction'], a: 1 },
  { t: 'mech', q: 'A pendulum moves with…', o: ['linear motion', 'rotary motion', 'oscillatory motion', 'reciprocating motion'], a: 2 },
  { t: 'energy', q: 'For a real machine, which is true?', o: ['MA > VR', 'MA = VR', 'MA < VR', 'VR depends on friction'], a: 2 },
  { t: 'friction', q: 'An object on an incline steeper than its angle of repose will…', o: ['stay at rest', 'slide down', 'move up', 'have zero friction'], a: 1 },
  { t: 'friction', q: 'Usually, compared with μ<sub>s</sub>, μ<sub>k</sub> is…', o: ['larger', 'smaller', 'equal', 'negative'], a: 1 },
  { t: 'logic', q: 'Which gate outputs 1 only when its inputs are different?', o: ['AND', 'NOR', 'XOR', 'NAND'], a: 2 },
  { t: 'logic', q: 'How many rows in a truth table with 3 inputs?', o: ['3', '6', '8', '9'], a: 2 },
  { t: 'logic', q: 'A NOR gate outputs 1 when…', o: ['any input is 1', 'all inputs are 1', 'all inputs are 0', 'inputs differ'], a: 2 },
  { t: 'circuits', q: 'Two 10 Ω resistors in parallel have a total resistance of…', o: ['20 Ω', '10 Ω', '5 Ω', '0.2 Ω'], a: 2 },
  { t: 'circuits', q: 'In a series circuit, the current is…', o: ['shared between components', 'the same everywhere', 'zero', 'greatest in the biggest resistor'], a: 1 },
  { t: 'stress', q: 'Toughness on a stress–strain diagram is shown by…', o: ['the slope of the elastic line', 'the highest point', 'the total area under the curve', 'the yield point'], a: 2 },
  { t: 'stress', q: 'Young\'s modulus (stiffness) is shown by…', o: ['the slope of the elastic region', 'the area under the curve', 'the fracture point', 'the UTS'], a: 0 },
  { t: 'phase', q: 'The Pb–Sn eutectic temperature is…', o: ['232 °C', '183 °C', '327 °C', '723 °C'], a: 1 },
  { t: 'phase', q: 'A hypoeutectic Pb–Sn alloy at room temperature contains…', o: ['primary β + eutectic', 'primary α + eutectic', '100% eutectic', 'only liquid'], a: 1 },
  { t: 'phase', q: 'The eutectic microstructure is…', o: ['large α grains', 'lamellar layers of α and β', 'dendrites of β', 'martensite'], a: 1 },
  { t: 'steel', q: 'Pearlite is a lamellar mixture of…', o: ['austenite + ferrite', 'ferrite + cementite', 'martensite + ferrite', 'cementite + austenite'], a: 1 },
  { t: 'steel', q: 'Water quenching a eutectoid steel from austenite produces…', o: ['coarse pearlite', 'fine pearlite', 'martensite', 'ferrite'], a: 2 },
  { t: 'steel', q: 'Tempering hardened steel…', o: ['increases brittleness', 'increases toughness, slightly reduces hardness', 'produces austenite', 'adds carbon'], a: 1 },
  { t: 'steel', q: 'Process annealing is done…', o: ['above the upper critical temperature', 'below 723 °C on cold-worked steel', 'by water quenching', 'in molten lead'], a: 1 },
  { t: 'steel', q: 'Which is a typical use of medium-carbon steel?', o: ['Wire products', 'Crankshafts', 'Punches', 'Boiler plate'], a: 1 },
  { t: 'plastics', q: 'Which plastic is best for machinery guards and safety glasses?', o: ['Nylon 6', 'ABS', 'Polycarbonate', 'PVC'], a: 2 },
  { t: 'plastics', q: 'Nylon 6 gears are chosen mainly for…', o: ['transparency', 'abrasion and fatigue resistance', 'biodegradability', 'low cost only'], a: 1 },
  { t: 'plastics', q: 'Hard hats and power-tool housings are commonly made from…', o: ['ABS', 'PLA', 'PE', 'PVC'], a: 0 }
];
