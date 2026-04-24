// Triple Memory - Local stats store
//
// Persists per-game records in localStorage under 'triple-memory:games:v1'.
// Device-local only: no network, no cross-device sync. Defensive cap on
// entries guards against localStorage overflow.

const STATS_STORAGE_KEY = 'triple-memory:games:v1';
const STATS_SCHEMA_VERSION = 1;
const STATS_MAX_ENTRIES = 5000;

const TripleMemoryStats = {
    schemaVersion: STATS_SCHEMA_VERSION,
    storageKey: STATS_STORAGE_KEY,

    _read() {
        try {
            const raw = localStorage.getItem(STATS_STORAGE_KEY);
            if (!raw) return [];
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        } catch (_) {
            return [];
        }
    },

    _write(list) {
        try {
            localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(list));
            return true;
        } catch (_) {
            return false;
        }
    },

    record(entry) {
        const record = {
            v: STATS_SCHEMA_VERSION,
            ts: Date.now(),
            pack: entry.pack,
            mode: entry.mode,
            size: entry.size,
            locale: entry.locale,
            flips: entry.flips,
            time_ms: entry.time_ms,
            memory_pct: entry.memory_pct,
            perfect: entry.perfect,
            avg: entry.avg,
            random: entry.random,
            expert: !!entry.expert
        };
        const list = this._read();
        list.push(record);
        if (list.length > STATS_MAX_ENTRIES) {
            list.splice(0, list.length - STATS_MAX_ENTRIES);
        }
        return this._write(list);
    },

    list(filter = {}) {
        const all = this._read();
        return all.filter(r => {
            if (filter.pack && filter.pack !== 'all' && r.pack !== filter.pack) return false;
            if (filter.mode && filter.mode !== 'all' && r.mode !== filter.mode) return false;
            if (filter.size && filter.size !== 'all' && Number(r.size) !== Number(filter.size)) return false;
            return true;
        });
    },

    clear() {
        try {
            localStorage.removeItem(STATS_STORAGE_KEY);
            return true;
        } catch (_) {
            return false;
        }
    },

    // 10-bin histogram of memory_pct in [0, 100]. Bucket i = [i*10, (i+1)*10);
    // the last bucket includes 100.
    histogramMemory(records) {
        const bins = new Array(10).fill(0);
        for (const r of records) {
            const pct = Number(r.memory_pct);
            if (!Number.isFinite(pct)) continue;
            let idx = Math.floor(pct / 10);
            if (idx < 0) idx = 0;
            if (idx > 9) idx = 9;
            bins[idx]++;
        }
        return bins;
    },

    // Linear histogram over arbitrary numeric values. Returns { bins, min, max };
    // when all values are equal, everything lands in the first bucket.
    histogramLinear(values, binCount) {
        const bins = new Array(binCount).fill(0);
        const finite = values.filter(Number.isFinite);
        if (finite.length === 0) return { bins, min: 0, max: 0 };
        let min = Infinity, max = -Infinity;
        for (const v of finite) {
            if (v < min) min = v;
            if (v > max) max = v;
        }
        if (min === max) {
            bins[0] = finite.length;
            return { bins, min, max };
        }
        const span = max - min;
        for (const v of finite) {
            let idx = Math.floor((v - min) / span * binCount);
            if (idx < 0) idx = 0;
            if (idx >= binCount) idx = binCount - 1;
            bins[idx]++;
        }
        return { bins, min, max };
    },

    summary(records) {
        const n = records.length;
        if (n === 0) return { count: 0, avgMemory: 0, bestMemory: 0, totalTimeMs: 0 };
        let sumMem = 0, bestMem = 0, sumTime = 0;
        for (const r of records) {
            const m = Number(r.memory_pct) || 0;
            sumMem += m;
            if (m > bestMem) bestMem = m;
            sumTime += Number(r.time_ms) || 0;
        }
        return {
            count: n,
            avgMemory: Math.round(sumMem / n),
            bestMemory: Math.round(bestMem),
            totalTimeMs: sumTime
        };
    }
};

if (typeof window !== 'undefined') window.TripleMemoryStats = TripleMemoryStats;
