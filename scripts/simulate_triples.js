// Empirical Monte Carlo for triple-matching memory game.
//
// Strategies simulated:
//   - perfect_memory: optimal-ish play with full recall. On each attempt:
//       1. If any unmatched triple has all 3 cards known → reveal them (match).
//       2. Else if any unmatched triple has 2 cards known → reveal those 2 +
//          one random unknown. P(match) = 1/|unknowns|; otherwise still
//          learns one new card.
//       3. Else → reveal 3 random unknowns (information gathering).
//   - random_no_memory: pick 3 random face-down cards each attempt,
//     discarding all knowledge after each attempt.
//
// p = 3 cards per triple (matches the engine's geography pack).

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function perfectMemoryGame(N, p = 3) {
    const totalCards = N * p;
    // cardTriple[pos] = triple id that card at position `pos` belongs to.
    const cardTriple = [];
    for (let t = 0; t < N; t++) for (let c = 0; c < p; c++) cardTriple.push(t);
    const shuffled = shuffle(cardTriple);
    const positions = [...Array(totalCards).keys()];

    const known = new Map(); // pos -> triple_id (only if not yet matched)
    const matched = new Set();
    let flips = 0;

    while (matched.size < N) {
        // Group known by triple_id.
        const knownByTriple = new Map();
        for (const [pos, tid] of known) {
            if (matched.has(tid)) continue;
            if (!knownByTriple.has(tid)) knownByTriple.set(tid, []);
            knownByTriple.get(tid).push(pos);
        }

        let picks;
        let full = null, two = null;
        for (const [tid, ps] of knownByTriple) {
            if (ps.length === p) { full = ps; break; }
            if (ps.length === 2 && !two) two = ps;
        }

        if (full) {
            picks = full;
        } else if (two) {
            // 2 known from same triple + 1 random unknown.
            const unknowns = positions.filter(pos => !known.has(pos) && !matched.has(shuffled[pos]));
            picks = [...two, unknowns[Math.floor(Math.random() * unknowns.length)]];
        } else {
            const unknowns = shuffle(
                positions.filter(pos => !known.has(pos) && !matched.has(shuffled[pos]))
            );
            picks = unknowns.slice(0, p);
        }

        flips += picks.length;
        for (const pos of picks) known.set(pos, shuffled[pos]);

        const triples = picks.map(pos => shuffled[pos]);
        if (triples.length === p && triples.every(t => t === triples[0])) {
            matched.add(triples[0]);
            for (const pos of picks) known.delete(pos);
        }
    }
    return flips;
}

function randomNoMemoryGame(N, p = 3) {
    const totalCards = N * p;
    const cardTriple = [];
    for (let t = 0; t < N; t++) for (let c = 0; c < p; c++) cardTriple.push(t);
    const shuffled = shuffle(cardTriple);

    const matched = new Set();
    let flips = 0;

    while (matched.size < N) {
        const faceDown = [];
        for (let pos = 0; pos < totalCards; pos++) if (!matched.has(shuffled[pos])) faceDown.push(pos);
        const picks = shuffle(faceDown).slice(0, p);
        flips += picks.length;
        const triples = picks.map(pos => shuffled[pos]);
        if (triples.every(t => t === triples[0])) matched.add(triples[0]);
    }
    return flips;
}

function stats(samples) {
    const mean = samples.reduce((a, b) => a + b, 0) / samples.length;
    const sorted = [...samples].sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];
    const stdev = Math.sqrt(samples.reduce((a, x) => a + (x - mean) ** 2, 0) / samples.length);
    const q1 = sorted[Math.floor(sorted.length * 0.25)];
    const q3 = sorted[Math.floor(sorted.length * 0.75)];
    return { mean, median, stdev, q1, q3, min: sorted[0], max: sorted[sorted.length - 1] };
}

const trials = Number(process.argv[2] || 20000);
console.log(`Monte Carlo simulation — ${trials} trials per configuration\n`);

for (const N of [4, 6, 8]) {
    const samples = [];
    for (let i = 0; i < trials; i++) samples.push(perfectMemoryGame(N));
    const s = stats(samples);
    console.log(`PERFECT MEMORY  N=${N} (${N*3} cards): mean=${s.mean.toFixed(1)}  median=${s.median}  sd=${s.stdev.toFixed(1)}  q1=${s.q1}  q3=${s.q3}  min=${s.min}  max=${s.max}`);
}
console.log();
for (const N of [4, 6, 8]) {
    // Fewer trials for random (it's slow for N=8).
    const t = N >= 8 ? Math.min(trials, 3000) : trials;
    const samples = [];
    for (let i = 0; i < t; i++) samples.push(randomNoMemoryGame(N));
    const s = stats(samples);
    console.log(`RANDOM NO-MEM   N=${N} (${N*3} cards): mean=${s.mean.toFixed(1)}  median=${s.median}  sd=${s.stdev.toFixed(1)}  q1=${s.q1}  q3=${s.q3}  min=${s.min}  max=${s.max}  [${t} trials]`);
}
