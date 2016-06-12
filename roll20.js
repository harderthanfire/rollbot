function BigInteger(t, e, r) { null != t && ("number" == typeof t ? this.fromNumber(t, e, r) : null == e && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, e)) }

function nbi() {
    return new BigInteger(null) }

function am1(t, e, r, n, s, o) {
    for (; --o >= 0;) {
        var i = e * this[t++] + r[n] + s;
        s = Math.floor(i / 67108864), r[n++] = 67108863 & i }
    return s }

function am2(t, e, r, n, s, o) {
    for (var i = 32767 & e, l = e >> 15; --o >= 0;) {
        var a = 32767 & this[t],
            u = this[t++] >> 15,
            p = l * a + u * i;
        a = i * a + ((32767 & p) << 15) + r[n] + (1073741823 & s), s = (a >>> 30) + (p >>> 15) + l * u + (s >>> 30), r[n++] = 1073741823 & a }
    return s }

function am3(t, e, r, n, s, o) {
    for (var i = 16383 & e, l = e >> 14; --o >= 0;) {
        var a = 16383 & this[t],
            u = this[t++] >> 14,
            p = l * a + u * i;
        a = i * a + ((16383 & p) << 14) + r[n] + s, s = (a >> 28) + (p >> 14) + l * u, r[n++] = 268435455 & a }
    return s }

function int2char(t) {
    return BI_RM.charAt(t) }

function intAt(t, e) {
    var r = BI_RC[t.charCodeAt(e)];
    return null == r ? -1 : r }

function bnpCopyTo(t) {
    for (var e = this.t - 1; e >= 0; --e) t[e] = this[e];
    t.t = this.t, t.s = this.s }

function bnpFromInt(t) { this.t = 1, this.s = 0 > t ? -1 : 0, t > 0 ? this[0] = t : -1 > t ? this[0] = t + this.DV : this.t = 0 }

function nbv(t) {
    var e = nbi();
    return e.fromInt(t), e }

function bnpFromString(t, e) {
    var r;
    if (16 == e) r = 4;
    else if (8 == e) r = 3;
    else if (256 == e) r = 8;
    else if (2 == e) r = 1;
    else if (32 == e) r = 5;
    else {
        if (4 != e) return void this.fromRadix(t, e);
        r = 2 }
    this.t = 0, this.s = 0;
    for (var n = t.length, s = !1, o = 0; --n >= 0;) {
        var i = 8 == r ? 255 & t[n] : intAt(t, n);
        0 > i ? "-" == t.charAt(n) && (s = !0) : (s = !1, 0 == o ? this[this.t++] = i : o + r > this.DB ? (this[this.t - 1] |= (i & (1 << this.DB - o) - 1) << o, this[this.t++] = i >> this.DB - o) : this[this.t - 1] |= i << o, o += r, o >= this.DB && (o -= this.DB)) }
    8 == r && 0 != (128 & t[0]) && (this.s = -1, o > 0 && (this[this.t - 1] |= (1 << this.DB - o) - 1 << o)), this.clamp(), s && BigInteger.ZERO.subTo(this, this) }

function bnpClamp() {
    for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t;) --this.t }

function bnToString(t) {
    if (this.s < 0) return "-" + this.negate().toString(t);
    var e;
    if (16 == t) e = 4;
    else if (8 == t) e = 3;
    else if (2 == t) e = 1;
    else if (32 == t) e = 5;
    else {
        if (4 != t) return this.toRadix(t);
        e = 2 }
    var r, n = (1 << e) - 1,
        s = !1,
        o = "",
        i = this.t,
        l = this.DB - i * this.DB % e;
    if (i-- > 0)
        for (l < this.DB && (r = this[i] >> l) > 0 && (s = !0, o = int2char(r)); i >= 0;) e > l ? (r = (this[i] & (1 << l) - 1) << e - l, r |= this[--i] >> (l += this.DB - e)) : (r = this[i] >> (l -= e) & n, 0 >= l && (l += this.DB, --i)), r > 0 && (s = !0), s && (o += int2char(r));
    return s ? o : "0" }

function bnNegate() {
    var t = nbi();
    return BigInteger.ZERO.subTo(this, t), t }

function bnAbs() {
    return this.s < 0 ? this.negate() : this }

function bnCompareTo(t) {
    var e = this.s - t.s;
    if (0 != e) return e;
    var r = this.t;
    if (e = r - t.t, 0 != e) return this.s < 0 ? -e : e;
    for (; --r >= 0;)
        if (0 != (e = this[r] - t[r])) return e;
    return 0 }

function nbits(t) {
    var e, r = 1;
    return 0 != (e = t >>> 16) && (t = e, r += 16), 0 != (e = t >> 8) && (t = e, r += 8), 0 != (e = t >> 4) && (t = e, r += 4), 0 != (e = t >> 2) && (t = e, r += 2), 0 != (e = t >> 1) && (t = e, r += 1), r }

function bnBitLength() {
    return this.t <= 0 ? 0 : this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM) }

function bnpDLShiftTo(t, e) {
    var r;
    for (r = this.t - 1; r >= 0; --r) e[r + t] = this[r];
    for (r = t - 1; r >= 0; --r) e[r] = 0;
    e.t = this.t + t, e.s = this.s }

function bnpDRShiftTo(t, e) {
    for (var r = t; r < this.t; ++r) e[r - t] = this[r];
    e.t = Math.max(this.t - t, 0), e.s = this.s }

function bnpLShiftTo(t, e) {
    var r, n = t % this.DB,
        s = this.DB - n,
        o = (1 << s) - 1,
        i = Math.floor(t / this.DB),
        l = this.s << n & this.DM;
    for (r = this.t - 1; r >= 0; --r) e[r + i + 1] = this[r] >> s | l, l = (this[r] & o) << n;
    for (r = i - 1; r >= 0; --r) e[r] = 0;
    e[i] = l, e.t = this.t + i + 1, e.s = this.s, e.clamp() }

function bnpRShiftTo(t, e) { e.s = this.s;
    var r = Math.floor(t / this.DB);
    if (r >= this.t) return void(e.t = 0);
    var n = t % this.DB,
        s = this.DB - n,
        o = (1 << n) - 1;
    e[0] = this[r] >> n;
    for (var i = r + 1; i < this.t; ++i) e[i - r - 1] |= (this[i] & o) << s, e[i - r] = this[i] >> n;
    n > 0 && (e[this.t - r - 1] |= (this.s & o) << s), e.t = this.t - r, e.clamp() }

function bnpSubTo(t, e) {
    for (var r = 0, n = 0, s = Math.min(t.t, this.t); s > r;) n += this[r] - t[r], e[r++] = n & this.DM, n >>= this.DB;
    if (t.t < this.t) {
        for (n -= t.s; r < this.t;) n += this[r], e[r++] = n & this.DM, n >>= this.DB;
        n += this.s } else {
        for (n += this.s; r < t.t;) n -= t[r], e[r++] = n & this.DM, n >>= this.DB;
        n -= t.s }
    e.s = 0 > n ? -1 : 0, -1 > n ? e[r++] = this.DV + n : n > 0 && (e[r++] = n), e.t = r, e.clamp() }

function bnpMultiplyTo(t, e) {
    var r = this.abs(),
        n = t.abs(),
        s = r.t;
    for (e.t = s + n.t; --s >= 0;) e[s] = 0;
    for (s = 0; s < n.t; ++s) e[s + r.t] = r.am(0, n[s], e, s, 0, r.t);
    e.s = 0, e.clamp(), this.s != t.s && BigInteger.ZERO.subTo(e, e) }

function bnpSquareTo(t) {
    for (var e = this.abs(), r = t.t = 2 * e.t; --r >= 0;) t[r] = 0;
    for (r = 0; r < e.t - 1; ++r) {
        var n = e.am(r, e[r], t, 2 * r, 0, 1);
        (t[r + e.t] += e.am(r + 1, 2 * e[r], t, 2 * r + 1, n, e.t - r - 1)) >= e.DV && (t[r + e.t] -= e.DV, t[r + e.t + 1] = 1) }
    t.t > 0 && (t[t.t - 1] += e.am(r, e[r], t, 2 * r, 0, 1)), t.s = 0, t.clamp() }

function bnpDivRemTo(t, e, r) {
    var n = t.abs();
    if (!(n.t <= 0)) {
        var s = this.abs();
        if (s.t < n.t) return null != e && e.fromInt(0), void(null != r && this.copyTo(r));
        null == r && (r = nbi());
        var o = nbi(),
            i = this.s,
            l = t.s,
            a = this.DB - nbits(n[n.t - 1]);
        a > 0 ? (n.lShiftTo(a, o), s.lShiftTo(a, r)) : (n.copyTo(o), s.copyTo(r));
        var u = o.t,
            p = o[u - 1];
        if (0 != p) {
            var c = p * (1 << this.F1) + (u > 1 ? o[u - 2] >> this.F2 : 0),
                h = this.FV / c,
                d = (1 << this.F1) / c,
                f = 1 << this.F2,
                g = r.t,
                m = g - u,
                v = null == e ? nbi() : e;
            for (o.dlShiftTo(m, v), r.compareTo(v) >= 0 && (r[r.t++] = 1, r.subTo(v, r)), BigInteger.ONE.dlShiftTo(u, v), v.subTo(o, o); o.t < u;) o[o.t++] = 0;
            for (; --m >= 0;) {
                var y = r[--g] == p ? this.DM : Math.floor(r[g] * h + (r[g - 1] + f) * d);
                if ((r[g] += o.am(0, y, r, m, 0, u)) < y)
                    for (o.dlShiftTo(m, v), r.subTo(v, r); r[g] < --y;) r.subTo(v, r) }
            null != e && (r.drShiftTo(u, e), i != l && BigInteger.ZERO.subTo(e, e)), r.t = u, r.clamp(), a > 0 && r.rShiftTo(a, r), 0 > i && BigInteger.ZERO.subTo(r, r) } } }

function bnMod(t) {
    var e = nbi();
    return this.abs().divRemTo(t, null, e), this.s < 0 && e.compareTo(BigInteger.ZERO) > 0 && t.subTo(e, e), e }

function Classic(t) { this.m = t }

function cConvert(t) {
    return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t }

function cRevert(t) {
    return t }

function cReduce(t) { t.divRemTo(this.m, null, t) }

function cMulTo(t, e, r) { t.multiplyTo(e, r), this.reduce(r) }

function cSqrTo(t, e) { t.squareTo(e), this.reduce(e) }

function bnpInvDigit() {
    if (this.t < 1) return 0;
    var t = this[0];
    if (0 == (1 & t)) return 0;
    var e = 3 & t;
    return e = e * (2 - (15 & t) * e) & 15, e = e * (2 - (255 & t) * e) & 255, e = e * (2 - ((65535 & t) * e & 65535)) & 65535, e = e * (2 - t * e % this.DV) % this.DV, e > 0 ? this.DV - e : -e }

function Montgomery(t) { this.m = t, this.mp = t.invDigit(), this.mpl = 32767 & this.mp, this.mph = this.mp >> 15, this.um = (1 << t.DB - 15) - 1, this.mt2 = 2 * t.t }

function montConvert(t) {
    var e = nbi();
    return t.abs().dlShiftTo(this.m.t, e), e.divRemTo(this.m, null, e), t.s < 0 && e.compareTo(BigInteger.ZERO) > 0 && this.m.subTo(e, e), e }

function montRevert(t) {
    var e = nbi();
    return t.copyTo(e), this.reduce(e), e }

function montReduce(t) {
    for (; t.t <= this.mt2;) t[t.t++] = 0;
    for (var e = 0; e < this.m.t; ++e) {
        var r = 32767 & t[e],
            n = r * this.mpl + ((r * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;
        for (r = e + this.m.t, t[r] += this.m.am(0, n, t, e, 0, this.m.t); t[r] >= t.DV;) t[r] -= t.DV, t[++r]++ }
    t.clamp(), t.drShiftTo(this.m.t, t), t.compareTo(this.m) >= 0 && t.subTo(this.m, t) }

function montSqrTo(t, e) { t.squareTo(e), this.reduce(e) }

function montMulTo(t, e, r) { t.multiplyTo(e, r), this.reduce(r) }

function bnpIsEven() {
    return 0 == (this.t > 0 ? 1 & this[0] : this.s) }

function bnpExp(t, e) {
    if (t > 4294967295 || 1 > t) return BigInteger.ONE;
    var r = nbi(),
        n = nbi(),
        s = e.convert(this),
        o = nbits(t) - 1;
    for (s.copyTo(r); --o >= 0;)
        if (e.sqrTo(r, n), (t & 1 << o) > 0) e.mulTo(n, s, r);
        else {
            var i = r;
            r = n, n = i }
    return e.revert(r) }

function bnModPowInt(t, e) {
    var r;
    return r = 256 > t || e.isEven() ? new Classic(e) : new Montgomery(e), this.exp(t, r) }

function bnClone() {
    var t = nbi();
    return this.copyTo(t), t }

function bnIntValue() {
    if (this.s < 0) {
        if (1 == this.t) return this[0] - this.DV;
        if (0 == this.t) return -1 } else {
        if (1 == this.t) return this[0];
        if (0 == this.t) return 0 }
    return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0] }

function bnByteValue() {
    return 0 == this.t ? this.s : this[0] << 24 >> 24 }

function bnShortValue() {
    return 0 == this.t ? this.s : this[0] << 16 >> 16 }

function bnpChunkSize(t) {
    return Math.floor(Math.LN2 * this.DB / Math.log(t)) }

function bnSigNum() {
    return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1 }

function bnpToRadix(t) {
    if (null == t && (t = 10), 0 == this.signum() || 2 > t || t > 36) return "0";
    var e = this.chunkSize(t),
        r = Math.pow(t, e),
        n = nbv(r),
        s = nbi(),
        o = nbi(),
        i = "";
    for (this.divRemTo(n, s, o); s.signum() > 0;) i = (r + o.intValue()).toString(t).substr(1) + i, s.divRemTo(n, s, o);
    return o.intValue().toString(t) + i }

function bnpFromRadix(t, e) { this.fromInt(0), null == e && (e = 10);
    for (var r = this.chunkSize(e), n = Math.pow(e, r), s = !1, o = 0, i = 0, l = 0; l < t.length; ++l) {
        var a = intAt(t, l);
        0 > a ? "-" == t.charAt(l) && 0 == this.signum() && (s = !0) : (i = e * i + a, ++o >= r && (this.dMultiply(n), this.dAddOffset(i, 0), o = 0, i = 0)) }
    o > 0 && (this.dMultiply(Math.pow(e, o)), this.dAddOffset(i, 0)), s && BigInteger.ZERO.subTo(this, this) }

function bnpFromNumber(t, e, r) {
    if ("number" == typeof e)
        if (2 > t) this.fromInt(1);
        else
            for (this.fromNumber(t, r), this.testBit(t - 1) || this.bitwiseTo(BigInteger.ONE.shiftLeft(t - 1), op_or, this), this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(e);) this.dAddOffset(2, 0), this.bitLength() > t && this.subTo(BigInteger.ONE.shiftLeft(t - 1), this);
    else {
        var n = new Array,
            s = 7 & t;
        n.length = (t >> 3) + 1, e.nextBytes(n), s > 0 ? n[0] &= (1 << s) - 1 : n[0] = 0, this.fromString(n, 256) } }

function bnToByteArray() {
    var t = this.t,
        e = new Array;
    e[0] = this.s;
    var r, n = this.DB - t * this.DB % 8,
        s = 0;
    if (t-- > 0)
        for (n < this.DB && (r = this[t] >> n) != (this.s & this.DM) >> n && (e[s++] = r | this.s << this.DB - n); t >= 0;) 8 > n ? (r = (this[t] & (1 << n) - 1) << 8 - n, r |= this[--t] >> (n += this.DB - 8)) : (r = this[t] >> (n -= 8) & 255, 0 >= n && (n += this.DB, --t)), 0 != (128 & r) && (r |= -256), 0 == s && (128 & this.s) != (128 & r) && ++s, (s > 0 || r != this.s) && (e[s++] = r);
    return e }

function bnEquals(t) {
    return 0 == this.compareTo(t) }

function bnMin(t) {
    return this.compareTo(t) < 0 ? this : t }

function bnMax(t) {
    return this.compareTo(t) > 0 ? this : t }

function bnpBitwiseTo(t, e, r) {
    var n, s, o = Math.min(t.t, this.t);
    for (n = 0; o > n; ++n) r[n] = e(this[n], t[n]);
    if (t.t < this.t) {
        for (s = t.s & this.DM, n = o; n < this.t; ++n) r[n] = e(this[n], s);
        r.t = this.t } else {
        for (s = this.s & this.DM, n = o; n < t.t; ++n) r[n] = e(s, t[n]);
        r.t = t.t }
    r.s = e(this.s, t.s), r.clamp() }

function op_and(t, e) {
    return t & e }

function bnAnd(t) {
    var e = nbi();
    return this.bitwiseTo(t, op_and, e), e }

function op_or(t, e) {
    return t | e }

function bnOr(t) {
    var e = nbi();
    return this.bitwiseTo(t, op_or, e), e }

function op_xor(t, e) {
    return t ^ e }

function bnXor(t) {
    var e = nbi();
    return this.bitwiseTo(t, op_xor, e), e }

function op_andnot(t, e) {
    return t & ~e }

function bnAndNot(t) {
    var e = nbi();
    return this.bitwiseTo(t, op_andnot, e), e }

function bnNot() {
    for (var t = nbi(), e = 0; e < this.t; ++e) t[e] = this.DM & ~this[e];
    return t.t = this.t, t.s = ~this.s, t }

function bnShiftLeft(t) {
    var e = nbi();
    return 0 > t ? this.rShiftTo(-t, e) : this.lShiftTo(t, e), e }

function bnShiftRight(t) {
    var e = nbi();
    return 0 > t ? this.lShiftTo(-t, e) : this.rShiftTo(t, e), e }

function lbit(t) {
    if (0 == t) return -1;
    var e = 0;
    return 0 == (65535 & t) && (t >>= 16, e += 16), 0 == (255 & t) && (t >>= 8, e += 8), 0 == (15 & t) && (t >>= 4, e += 4), 0 == (3 & t) && (t >>= 2, e += 2), 0 == (1 & t) && ++e, e }

function bnGetLowestSetBit() {
    for (var t = 0; t < this.t; ++t)
        if (0 != this[t]) return t * this.DB + lbit(this[t]);
    return this.s < 0 ? this.t * this.DB : -1 }

function cbit(t) {
    for (var e = 0; 0 != t;) t &= t - 1, ++e;
    return e }

function bnBitCount() {
    for (var t = 0, e = this.s & this.DM, r = 0; r < this.t; ++r) t += cbit(this[r] ^ e);
    return t }

function bnTestBit(t) {
    var e = Math.floor(t / this.DB);
    return e >= this.t ? 0 != this.s : 0 != (this[e] & 1 << t % this.DB) }

function bnpChangeBit(t, e) {
    var r = BigInteger.ONE.shiftLeft(t);
    return this.bitwiseTo(r, e, r), r }

function bnSetBit(t) {
    return this.changeBit(t, op_or) }

function bnClearBit(t) {
    return this.changeBit(t, op_andnot) }

function bnFlipBit(t) {
    return this.changeBit(t, op_xor) }

function bnpAddTo(t, e) {
    for (var r = 0, n = 0, s = Math.min(t.t, this.t); s > r;) n += this[r] + t[r], e[r++] = n & this.DM, n >>= this.DB;
    if (t.t < this.t) {
        for (n += t.s; r < this.t;) n += this[r], e[r++] = n & this.DM, n >>= this.DB;
        n += this.s } else {
        for (n += this.s; r < t.t;) n += t[r], e[r++] = n & this.DM, n >>= this.DB;
        n += t.s }
    e.s = 0 > n ? -1 : 0, n > 0 ? e[r++] = n : -1 > n && (e[r++] = this.DV + n), e.t = r, e.clamp() }

function bnAdd(t) {
    var e = nbi();
    return this.addTo(t, e), e }

function bnSubtract(t) {
    var e = nbi();
    return this.subTo(t, e), e }

function bnMultiply(t) {
    var e = nbi();
    return this.multiplyTo(t, e), e }

function bnSquare() {
    var t = nbi();
    return this.squareTo(t), t }

function bnDivide(t) {
    var e = nbi();
    return this.divRemTo(t, e, null), e }

function bnRemainder(t) {
    var e = nbi();
    return this.divRemTo(t, null, e), e }

function bnDivideAndRemainder(t) {
    var e = nbi(),
        r = nbi();
    return this.divRemTo(t, e, r), new Array(e, r) }

function bnpDMultiply(t) { this[this.t] = this.am(0, t - 1, this, 0, 0, this.t), ++this.t, this.clamp() }

function bnpDAddOffset(t, e) {
    if (0 != t) {
        for (; this.t <= e;) this[this.t++] = 0;
        for (this[e] += t; this[e] >= this.DV;) this[e] -= this.DV, ++e >= this.t && (this[this.t++] = 0), ++this[e] } }

function NullExp() {}

function nNop(t) {
    return t }

function nMulTo(t, e, r) { t.multiplyTo(e, r) }

function nSqrTo(t, e) { t.squareTo(e) }

function bnPow(t) {
    return this.exp(t, new NullExp) }

function bnpMultiplyLowerTo(t, e, r) {
    var n = Math.min(this.t + t.t, e);
    for (r.s = 0, r.t = n; n > 0;) r[--n] = 0;
    var s;
    for (s = r.t - this.t; s > n; ++n) r[n + this.t] = this.am(0, t[n], r, n, 0, this.t);
    for (s = Math.min(t.t, e); s > n; ++n) this.am(0, t[n], r, n, 0, e - n);
    r.clamp() }

function bnpMultiplyUpperTo(t, e, r) {--e;
    var n = r.t = this.t + t.t - e;
    for (r.s = 0; --n >= 0;) r[n] = 0;
    for (n = Math.max(e - this.t, 0); n < t.t; ++n) r[this.t + n - e] = this.am(e - n, t[n], r, 0, 0, this.t + n - e);
    r.clamp(), r.drShiftTo(1, r) }

function Barrett(t) { this.r2 = nbi(), this.q3 = nbi(), BigInteger.ONE.dlShiftTo(2 * t.t, this.r2), this.mu = this.r2.divide(t), this.m = t }

function barrettConvert(t) {
    if (t.s < 0 || t.t > 2 * this.m.t) return t.mod(this.m);
    if (t.compareTo(this.m) < 0) return t;
    var e = nbi();
    return t.copyTo(e), this.reduce(e), e }

function barrettRevert(t) {
    return t }

function barrettReduce(t) {
    for (t.drShiftTo(this.m.t - 1, this.r2), t.t > this.m.t + 1 && (t.t = this.m.t + 1, t.clamp()), this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3), this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); t.compareTo(this.r2) < 0;) t.dAddOffset(1, this.m.t + 1);
    for (t.subTo(this.r2, t); t.compareTo(this.m) >= 0;) t.subTo(this.m, t) }

function barrettSqrTo(t, e) { t.squareTo(e), this.reduce(e) }

function barrettMulTo(t, e, r) { t.multiplyTo(e, r), this.reduce(r) }

function bnModPow(t, e) {
    var r, n, s = t.bitLength(),
        o = nbv(1);
    if (0 >= s) return o;
    r = 18 > s ? 1 : 48 > s ? 3 : 144 > s ? 4 : 768 > s ? 5 : 6, n = 8 > s ? new Classic(e) : e.isEven() ? new Barrett(e) : new Montgomery(e);
    var i = new Array,
        l = 3,
        a = r - 1,
        u = (1 << r) - 1;
    if (i[1] = n.convert(this), r > 1) {
        var p = nbi();
        for (n.sqrTo(i[1], p); u >= l;) i[l] = nbi(), n.mulTo(p, i[l - 2], i[l]), l += 2 }
    var c, h, d = t.t - 1,
        f = !0,
        g = nbi();
    for (s = nbits(t[d]) - 1; d >= 0;) {
        for (s >= a ? c = t[d] >> s - a & u : (c = (t[d] & (1 << s + 1) - 1) << a - s, d > 0 && (c |= t[d - 1] >> this.DB + s - a)), l = r; 0 == (1 & c);) c >>= 1, --l;
        if ((s -= l) < 0 && (s += this.DB, --d), f) i[c].copyTo(o), f = !1;
        else {
            for (; l > 1;) n.sqrTo(o, g), n.sqrTo(g, o), l -= 2;
            l > 0 ? n.sqrTo(o, g) : (h = o, o = g, g = h), n.mulTo(g, i[c], o) }
        for (; d >= 0 && 0 == (t[d] & 1 << s);) n.sqrTo(o, g), h = o, o = g, g = h, --s < 0 && (s = this.DB - 1, --d) }
    return n.revert(o) }

function bnGCD(t) {
    var e = this.s < 0 ? this.negate() : this.clone(),
        r = t.s < 0 ? t.negate() : t.clone();
    if (e.compareTo(r) < 0) {
        var n = e;
        e = r, r = n }
    var s = e.getLowestSetBit(),
        o = r.getLowestSetBit();
    if (0 > o) return e;
    for (o > s && (o = s), o > 0 && (e.rShiftTo(o, e), r.rShiftTo(o, r)); e.signum() > 0;)(s = e.getLowestSetBit()) > 0 && e.rShiftTo(s, e), (s = r.getLowestSetBit()) > 0 && r.rShiftTo(s, r), e.compareTo(r) >= 0 ? (e.subTo(r, e), e.rShiftTo(1, e)) : (r.subTo(e, r), r.rShiftTo(1, r));
    return o > 0 && r.lShiftTo(o, r), r }

function bnpModInt(t) {
    if (0 >= t) return 0;
    var e = this.DV % t,
        r = this.s < 0 ? t - 1 : 0;
    if (this.t > 0)
        if (0 == e) r = this[0] % t;
        else
            for (var n = this.t - 1; n >= 0; --n) r = (e * r + this[n]) % t;
    return r }

function bnModInverse(t) {
    var e = t.isEven();
    if (this.isEven() && e || 0 == t.signum()) return BigInteger.ZERO;
    for (var r = t.clone(), n = this.clone(), s = nbv(1), o = nbv(0), i = nbv(0), l = nbv(1); 0 != r.signum();) {
        for (; r.isEven();) r.rShiftTo(1, r), e ? (s.isEven() && o.isEven() || (s.addTo(this, s), o.subTo(t, o)), s.rShiftTo(1, s)) : o.isEven() || o.subTo(t, o), o.rShiftTo(1, o);
        for (; n.isEven();) n.rShiftTo(1, n), e ? (i.isEven() && l.isEven() || (i.addTo(this, i), l.subTo(t, l)), i.rShiftTo(1, i)) : l.isEven() || l.subTo(t, l), l.rShiftTo(1, l);
        r.compareTo(n) >= 0 ? (r.subTo(n, r), e && s.subTo(i, s), o.subTo(l, o)) : (n.subTo(r, n), e && i.subTo(s, i), l.subTo(o, l)) }
    return 0 != n.compareTo(BigInteger.ONE) ? BigInteger.ZERO : l.compareTo(t) >= 0 ? l.subtract(t) : l.signum() < 0 ? (l.addTo(t, l), l.signum() < 0 ? l.add(t) : l) : l }

function bnIsProbablePrime(t) {
    var e, r = this.abs();
    if (1 == r.t && r[0] <= lowprimes[lowprimes.length - 1]) {
        for (e = 0; e < lowprimes.length; ++e)
            if (r[0] == lowprimes[e]) return !0;
        return !1 }
    if (r.isEven()) return !1;
    for (e = 1; e < lowprimes.length;) {
        for (var n = lowprimes[e], s = e + 1; s < lowprimes.length && lplim > n;) n *= lowprimes[s++];
        for (n = r.modInt(n); s > e;)
            if (n % lowprimes[e++] == 0) return !1 }
    return r.millerRabin(t) }

function bnpMillerRabin(t) {
    var e = this.subtract(BigInteger.ONE),
        r = e.getLowestSetBit();
    if (0 >= r) return !1;
    var n = e.shiftRight(r);
    t = t + 1 >> 1, t > lowprimes.length && (t = lowprimes.length);
    for (var s = nbi(), o = 0; t > o; ++o) { s.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
        var i = s.modPow(n, this);
        if (0 != i.compareTo(BigInteger.ONE) && 0 != i.compareTo(e)) {
            for (var l = 1; l++ < r && 0 != i.compareTo(e);)
                if (i = i.modPowInt(2, this), 0 == i.compareTo(BigInteger.ONE)) return !1;
            if (0 != i.compareTo(e)) return !1 } }
    return !0 }

function parseBigInt(t, e) {
    return new BigInteger(t, e) }

function linebrk(t, e) {
    for (var r = "", n = 0; n + e < t.length;) r += t.substring(n, n + e) + "\n", n += e;
    return r + t.substring(n, t.length) }

function byte2Hex(t) {
    return 16 > t ? "0" + t.toString(16) : t.toString(16) }

function pkcs1pad2(t, e) {
    if (e < t.length + 11) return alert("Message too long for RSA"), null;
    for (var r = new Array, n = t.length - 1; n >= 0 && e > 0;) {
        var s = t.charCodeAt(n--);
        128 > s ? r[--e] = s : s > 127 && 2048 > s ? (r[--e] = 63 & s | 128, r[--e] = s >> 6 | 192) : (r[--e] = 63 & s | 128, r[--e] = s >> 6 & 63 | 128, r[--e] = s >> 12 | 224) }
    r[--e] = 0;
    for (var o = new SecureRandom, i = new Array; e > 2;) {
        for (i[0] = 0; 0 == i[0];) o.nextBytes(i);
        r[--e] = i[0] }
    return r[--e] = 2, r[--e] = 0, new BigInteger(r) }

function oaep_mgf1_arr(t, e, r) {
    for (var n = "", s = 0; n.length < e;) n += r(String.fromCharCode.apply(String, t.concat([(4278190080 & s) >> 24, (16711680 & s) >> 16, (65280 & s) >> 8, 255 & s]))), s += 1;
    return n }

function oaep_pad(t, e, r) {
    if (t.length + 2 * SHA1_SIZE + 2 > e) throw "Message too long for RSA";
    var n, s = "";
    for (n = 0; n < e - t.length - 2 * SHA1_SIZE - 2; n += 1) s += "\x00";
    var o = rstr_sha1("") + s + "" + t,
        i = new Array(SHA1_SIZE);
    (new SecureRandom).nextBytes(i);
    var l = oaep_mgf1_arr(i, o.length, r || rstr_sha1),
        a = [];
    for (n = 0; n < o.length; n += 1) a[n] = o.charCodeAt(n) ^ l.charCodeAt(n);
    var u = oaep_mgf1_arr(a, i.length, rstr_sha1),
        p = [0];
    for (n = 0; n < i.length; n += 1) p[n + 1] = i[n] ^ u.charCodeAt(n);
    return new BigInteger(p.concat(a)) }

function RSAKey() { this.n = null, this.e = 0, this.d = null, this.p = null, this.q = null, this.dmp1 = null, this.dmq1 = null, this.coeff = null }

function RSASetPublic(t, e) { this.isPublic = !0, "string" != typeof t ? (this.n = t, this.e = e) : null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = parseBigInt(t, 16), this.e = parseInt(e, 16)) : alert("Invalid RSA public key") }

function RSADoPublic(t) {
    return t.modPowInt(this.e, this.n) }

function RSAEncrypt(t) {
    var e = pkcs1pad2(t, this.n.bitLength() + 7 >> 3);
    if (null == e) return null;
    var r = this.doPublic(e);
    if (null == r) return null;
    var n = r.toString(16);
    return 0 == (1 & n.length) ? n : "0" + n }

function RSAEncryptOAEP(t, e) {
    var r = oaep_pad(t, this.n.bitLength() + 7 >> 3, e);
    if (null == r) return null;
    var n = this.doPublic(r);
    if (null == n) return null;
    var s = n.toString(16);
    return 0 == (1 & s.length) ? s : "0" + s }

function pkcs1unpad2(t, e) {
    for (var r = t.toByteArray(), n = 0; n < r.length && 0 == r[n];) ++n;
    if (r.length - n != e - 1 || 2 != r[n]) return null;
    for (++n; 0 != r[n];)
        if (++n >= r.length) return null;
    for (var s = ""; ++n < r.length;) {
        var o = 255 & r[n];
        128 > o ? s += String.fromCharCode(o) : o > 191 && 224 > o ? (s += String.fromCharCode((31 & o) << 6 | 63 & r[n + 1]), ++n) : (s += String.fromCharCode((15 & o) << 12 | (63 & r[n + 1]) << 6 | 63 & r[n + 2]), n += 2) }
    return s }

function oaep_mgf1_str(t, e, r) {
    for (var n = "", s = 0; n.length < e;) n += r(t + String.fromCharCode.apply(String, [(4278190080 & s) >> 24, (16711680 & s) >> 16, (65280 & s) >> 8, 255 & s])), s += 1;
    return n }

function oaep_unpad(t, e, r) { t = t.toByteArray();
    var n;
    for (n = 0; n < t.length; n += 1) t[n] &= 255;
    for (; t.length < e;) t.unshift(0);
    if (t = String.fromCharCode.apply(String, t), t.length < 2 * SHA1_SIZE + 2) throw "Cipher too short";
    var n, s = t.substr(1, SHA1_SIZE),
        o = t.substr(SHA1_SIZE + 1),
        i = oaep_mgf1_str(o, SHA1_SIZE, r || rstr_sha1),
        l = [];
    for (n = 0; n < s.length; n += 1) l[n] = s.charCodeAt(n) ^ i.charCodeAt(n);
    var a = oaep_mgf1_str(String.fromCharCode.apply(String, l), t.length - SHA1_SIZE, rstr_sha1),
        u = [];
    for (n = 0; n < o.length; n += 1) u[n] = o.charCodeAt(n) ^ a.charCodeAt(n);
    if (u = String.fromCharCode.apply(String, u), u.substr(0, SHA1_SIZE) !== rstr_sha1("")) throw "Hash mismatch";
    u = u.substr(SHA1_SIZE);
    var p = u.indexOf(""),
        c = -1 != p ? u.substr(0, p).lastIndexOf("\x00") : -1;
    if (c + 1 != p) throw "Malformed data";
    return u.substr(p + 1) }

function RSASetPrivate(t, e, r) { this.isPrivate = !0, "string" != typeof t ? (this.n = t, this.e = e, this.d = r) : null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = parseBigInt(t, 16), this.e = parseInt(e, 16), this.d = parseBigInt(r, 16)) : alert("Invalid RSA private key") }

function RSASetPrivateEx(t, e, r, n, s, o, i, l) {
    if (this.isPrivate = !0, null == t) throw "RSASetPrivateEx N == null";
    if (null == e) throw "RSASetPrivateEx E == null";
    if (0 == t.length) throw "RSASetPrivateEx N.length == 0";
    if (0 == e.length) throw "RSASetPrivateEx E.length == 0";
    null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = parseBigInt(t, 16), this.e = parseInt(e, 16), this.d = parseBigInt(r, 16), this.p = parseBigInt(n, 16), this.q = parseBigInt(s, 16), this.dmp1 = parseBigInt(o, 16), this.dmq1 = parseBigInt(i, 16), this.coeff = parseBigInt(l, 16)) : alert("Invalid RSA private key in RSASetPrivateEx") }

function RSAGenerate(t, e) {
    var r = new SecureRandom,
        n = t >> 1;
    this.e = parseInt(e, 16);
    for (var s = new BigInteger(e, 16);;) {
        for (; this.p = new BigInteger(t - n, 1, r), 0 != this.p.subtract(BigInteger.ONE).gcd(s).compareTo(BigInteger.ONE) || !this.p.isProbablePrime(10););
        for (; this.q = new BigInteger(n, 1, r), 0 != this.q.subtract(BigInteger.ONE).gcd(s).compareTo(BigInteger.ONE) || !this.q.isProbablePrime(10););
        if (this.p.compareTo(this.q) <= 0) {
            var o = this.p;
            this.p = this.q, this.q = o }
        var i = this.p.subtract(BigInteger.ONE),
            l = this.q.subtract(BigInteger.ONE),
            a = i.multiply(l);
        if (0 == a.gcd(s).compareTo(BigInteger.ONE)) { this.n = this.p.multiply(this.q), this.d = s.modInverse(a), this.dmp1 = this.d.mod(i), this.dmq1 = this.d.mod(l), this.coeff = this.q.modInverse(this.p);
            break } } }

function RSADoPrivate(t) {
    if (null == this.p || null == this.q) return t.modPow(this.d, this.n);
    for (var e = t.mod(this.p).modPow(this.dmp1, this.p), r = t.mod(this.q).modPow(this.dmq1, this.q); e.compareTo(r) < 0;) e = e.add(this.p);
    return e.subtract(r).multiply(this.coeff).mod(this.p).multiply(this.q).add(r) }

function RSADecrypt(t) {
    var e = parseBigInt(t, 16),
        r = this.doPrivate(e);
    return null == r ? null : pkcs1unpad2(r, this.n.bitLength() + 7 >> 3) }

function RSADecryptOAEP(t, e) {
    var r = parseBigInt(t, 16),
        n = this.doPrivate(r);
    return null == n ? null : oaep_unpad(n, this.n.bitLength() + 7 >> 3, e) }

function hex2b64(t) {
    var e, r, n = "";
    for (e = 0; e + 3 <= t.length; e += 3) r = parseInt(t.substring(e, e + 3), 16), n += b64map.charAt(r >> 6) + b64map.charAt(63 & r);
    if (e + 1 == t.length ? (r = parseInt(t.substring(e, e + 1), 16), n += b64map.charAt(r << 2)) : e + 2 == t.length && (r = parseInt(t.substring(e, e + 2), 16), n += b64map.charAt(r >> 2) + b64map.charAt((3 & r) << 4)), b64pad)
        for (;
            (3 & n.length) > 0;) n += b64pad;
    return n }

function b64tohex(t) {
    var e, r, n, s = "",
        o = 0;
    for (e = 0; e < t.length && t.charAt(e) != b64pad; ++e) n = b64map.indexOf(t.charAt(e)), 0 > n || (0 == o ? (s += int2char(n >> 2), r = 3 & n, o = 1) : 1 == o ? (s += int2char(r << 2 | n >> 4), r = 15 & n, o = 2) : 2 == o ? (s += int2char(r), s += int2char(n >> 2), r = 3 & n, o = 3) : (s += int2char(r << 2 | n >> 4), s += int2char(15 & n), o = 0));
    return 1 == o && (s += int2char(r << 2)), s }

function b64toBA(t) {
    var e, r = b64tohex(t),
        n = new Array;
    for (e = 0; 2 * e < r.length; ++e) n[e] = parseInt(r.substring(2 * e, 2 * e + 2), 16);
    return n }

function _rsapem_pemToBase64(t) {
    var e = t;
    return e = e.replace("-----BEGIN RSA PRIVATE KEY-----", ""), e = e.replace("-----END RSA PRIVATE KEY-----", ""), e = e.replace(/[ \n]+/g, "") }

function _rsapem_getPosArrayOfChildrenFromHex(t) {
    var e = new Array,
        r = ASN1HEX.getStartPosOfV_AtObj(t, 0),
        n = ASN1HEX.getPosOfNextSibling_AtObj(t, r),
        s = ASN1HEX.getPosOfNextSibling_AtObj(t, n),
        o = ASN1HEX.getPosOfNextSibling_AtObj(t, s),
        i = ASN1HEX.getPosOfNextSibling_AtObj(t, o),
        l = ASN1HEX.getPosOfNextSibling_AtObj(t, i),
        a = ASN1HEX.getPosOfNextSibling_AtObj(t, l),
        u = ASN1HEX.getPosOfNextSibling_AtObj(t, a),
        p = ASN1HEX.getPosOfNextSibling_AtObj(t, u);
    return e.push(r, n, s, o, i, l, a, u, p), e }

function _rsapem_getHexValueArrayOfChildrenFromHex(t) {
    var e = _rsapem_getPosArrayOfChildrenFromHex(t),
        r = ASN1HEX.getHexOfV_AtObj(t, e[0]),
        n = ASN1HEX.getHexOfV_AtObj(t, e[1]),
        s = ASN1HEX.getHexOfV_AtObj(t, e[2]),
        o = ASN1HEX.getHexOfV_AtObj(t, e[3]),
        i = ASN1HEX.getHexOfV_AtObj(t, e[4]),
        l = ASN1HEX.getHexOfV_AtObj(t, e[5]),
        a = ASN1HEX.getHexOfV_AtObj(t, e[6]),
        u = ASN1HEX.getHexOfV_AtObj(t, e[7]),
        p = ASN1HEX.getHexOfV_AtObj(t, e[8]),
        c = new Array;
    return c.push(r, n, s, o, i, l, a, u, p), c }

function _rsapem_readPrivateKeyFromASN1HexString(t) {
    var e = _rsapem_getHexValueArrayOfChildrenFromHex(t);
    this.setPrivateEx(e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8]) }

function _rsapem_readPrivateKeyFromPEMString(t) {
    var e = _rsapem_pemToBase64(t),
        r = b64tohex(e),
        n = _rsapem_getHexValueArrayOfChildrenFromHex(r);
    this.setPrivateEx(n[1], n[2], n[3], n[4], n[5], n[6], n[7], n[8]) }

function _rsasign_getHexPaddedDigestInfoForString(t, e, r) {
    var n = function(t) {
            return KJUR.crypto.Util.hashString(t, r) },
        s = n(t);
    return KJUR.crypto.Util.getPaddedDigestInfoHex(s, r, e) }

function _zeroPaddingOfSignature(t, e) {
    for (var r = "", n = e / 4 - t.length, s = 0; n > s; s++) r += "0";
    return r + t }

function _rsasign_signString(t, e) {
    var r = function(t) {
            return KJUR.crypto.Util.hashString(t, e) },
        n = r(t);
    return this.signWithMessageHash(n, e) }

function _rsasign_signWithMessageHash(t, e) {
    var r = KJUR.crypto.Util.getPaddedDigestInfoHex(t, e, this.n.bitLength()),
        n = parseBigInt(r, 16),
        s = this.doPrivate(n),
        o = s.toString(16);
    return _zeroPaddingOfSignature(o, this.n.bitLength()) }

function _rsasign_signStringWithSHA1(t) {
    return _rsasign_signString.call(this, t, "sha1") }

function _rsasign_signStringWithSHA256(t) {
    return _rsasign_signString.call(this, t, "sha256") }

function pss_mgf1_str(t, e, r) {
    for (var n = "", s = 0; n.length < e;) n += hextorstr(r(rstrtohex(t + String.fromCharCode.apply(String, [(4278190080 & s) >> 24, (16711680 & s) >> 16, (65280 & s) >> 8, 255 & s])))), s += 1;
    return n }

function _rsasign_signStringPSS(t, e, r) {
    var n = function(t) {
            return KJUR.crypto.Util.hashHex(t, e) },
        s = n(rstrtohex(t));
    return void 0 === r && (r = -1), this.signWithMessageHashPSS(s, e, r) }

function _rsasign_signWithMessageHashPSS(t, e, r) {
    var n, s = hextorstr(t),
        o = s.length,
        i = this.n.bitLength() - 1,
        l = Math.ceil(i / 8),
        a = function(t) {
            return KJUR.crypto.Util.hashHex(t, e) };
    if (-1 === r || void 0 === r) r = o;
    else if (-2 === r) r = l - o - 2;
    else if (-2 > r) throw "invalid salt length";
    if (o + r + 2 > l) throw "data too long";
    var u = "";
    r > 0 && (u = new Array(r), (new SecureRandom).nextBytes(u), u = String.fromCharCode.apply(String, u));
    var p = hextorstr(a(rstrtohex("\x00\x00\x00\x00\x00\x00\x00\x00" + s + u))),
        c = [];
    for (n = 0; l - r - o - 2 > n; n += 1) c[n] = 0;
    var h = String.fromCharCode.apply(String, c) + "" + u,
        d = pss_mgf1_str(p, h.length, a),
        f = [];
    for (n = 0; n < h.length; n += 1) f[n] = h.charCodeAt(n) ^ d.charCodeAt(n);
    var g = 65280 >> 8 * l - i & 255;
    for (f[0] &= ~g, n = 0; o > n; n++) f.push(p.charCodeAt(n));
    return f.push(188), _zeroPaddingOfSignature(this.doPrivate(new BigInteger(f)).toString(16), this.n.bitLength()) }

function _rsasign_getDecryptSignatureBI(t, e, r) {
    var n = new RSAKey;
    n.setPublic(e, r);
    var s = n.doPublic(t);
    return s }

function _rsasign_getHexDigestInfoFromSig(t, e, r) {
    var n = _rsasign_getDecryptSignatureBI(t, e, r),
        s = n.toString(16).replace(/^1f+00/, "");
    return s }

function _rsasign_getAlgNameAndHashFromHexDisgestInfo(t) {
    for (var e in KJUR.crypto.Util.DIGESTINFOHEAD) {
        var r = KJUR.crypto.Util.DIGESTINFOHEAD[e],
            n = r.length;
        if (t.substring(0, n) == r) {
            var s = [e, t.substring(n)];
            return s } }
    return [] }

function _rsasign_verifySignatureWithArgs(t, e, r, n) {
    var s = _rsasign_getHexDigestInfoFromSig(e, r, n),
        o = _rsasign_getAlgNameAndHashFromHexDisgestInfo(s);
    if (0 == o.length) return !1;
    var i = o[0],
        l = o[1],
        a = function(t) {
            return KJUR.crypto.Util.hashString(t, i) },
        u = a(t);
    return l == u }

function _rsasign_verifyHexSignatureForMessage(t, e) {
    var r = parseBigInt(t, 16),
        n = _rsasign_verifySignatureWithArgs(e, r, this.n.toString(16), this.e.toString(16));
    return n }

function _rsasign_verifyString(t, e) { e = e.replace(_RE_HEXDECONLY, ""), e = e.replace(/[ \n]+/g, "");
    var r = parseBigInt(e, 16);
    if (r.bitLength() > this.n.bitLength()) return 0;
    var n = this.doPublic(r),
        s = n.toString(16).replace(/^1f+00/, ""),
        o = _rsasign_getAlgNameAndHashFromHexDisgestInfo(s);
    if (0 == o.length) return !1;
    var i = o[0],
        l = o[1],
        a = function(t) {
            return KJUR.crypto.Util.hashString(t, i) },
        u = a(t);
    return l == u }

function _rsasign_verifyWithMessageHash(t, e) { e = e.replace(_RE_HEXDECONLY, ""), e = e.replace(/[ \n]+/g, "");
    var r = parseBigInt(e, 16);
    if (r.bitLength() > this.n.bitLength()) return 0;
    var n = this.doPublic(r),
        s = n.toString(16).replace(/^1f+00/, ""),
        o = _rsasign_getAlgNameAndHashFromHexDisgestInfo(s);
    if (0 == o.length) return !1;
    var i = (o[0], o[1]);
    return i == t }

function _rsasign_verifyStringPSS(t, e, r, n) {
    var s = function(t) {
            return KJUR.crypto.Util.hashHex(t, r) },
        o = s(rstrtohex(t));
    return void 0 === n && (n = -1), this.verifyWithMessageHashPSS(o, e, r, n) }

function _rsasign_verifyWithMessageHashPSS(t, e, r, n) {
    var s = new BigInteger(e, 16);
    if (s.bitLength() > this.n.bitLength()) return !1;
    var o, i = function(t) {
            return KJUR.crypto.Util.hashHex(t, r) },
        l = hextorstr(t),
        a = l.length,
        u = this.n.bitLength() - 1,
        p = Math.ceil(u / 8);
    if (-1 === n || void 0 === n) n = a;
    else if (-2 === n) n = p - a - 2;
    else if (-2 > n) throw "invalid salt length";
    if (a + n + 2 > p) throw "data too long";
    var c = this.doPublic(s).toByteArray();
    for (o = 0; o < c.length; o += 1) c[o] &= 255;
    for (; c.length < p;) c.unshift(0);
    if (188 !== c[p - 1]) throw "encoded message does not end in 0xbc";
    c = String.fromCharCode.apply(String, c);
    var h = c.substr(0, p - a - 1),
        d = c.substr(h.length, a),
        f = 65280 >> 8 * p - u & 255;
    if (0 !== (h.charCodeAt(0) & f)) throw "bits beyond keysize not zero";
    var g = pss_mgf1_str(d, h.length, i),
        m = [];
    for (o = 0; o < h.length; o += 1) m[o] = h.charCodeAt(o) ^ g.charCodeAt(o);
    m[0] &= ~f;
    var v = p - a - n - 2;
    for (o = 0; v > o; o += 1)
        if (0 !== m[o]) throw "leftmost octets not zero";
    if (1 !== m[v]) throw "0x01 marker not found";
    return d === hextorstr(i(rstrtohex("\x00\x00\x00\x00\x00\x00\x00\x00" + l + String.fromCharCode.apply(String, m.slice(-n))))) }

function X509() { this.subjectPublicKeyRSA = null, this.subjectPublicKeyRSA_hN = null, this.subjectPublicKeyRSA_hE = null, this.hex = null, this.getSerialNumberHex = function() {
        return ASN1HEX.getDecendantHexVByNthList(this.hex, 0, [0, 1]) }, this.getIssuerHex = function() {
        return ASN1HEX.getDecendantHexTLVByNthList(this.hex, 0, [0, 3]) }, this.getIssuerString = function() {
        return X509.hex2dn(ASN1HEX.getDecendantHexTLVByNthList(this.hex, 0, [0, 3])) }, this.getSubjectHex = function() {
        return ASN1HEX.getDecendantHexTLVByNthList(this.hex, 0, [0, 5]) }, this.getSubjectString = function() {
        return X509.hex2dn(ASN1HEX.getDecendantHexTLVByNthList(this.hex, 0, [0, 5])) }, this.getNotBefore = function() {
        var t = ASN1HEX.getDecendantHexVByNthList(this.hex, 0, [0, 4, 0]);
        return t = t.replace(/(..)/g, "%$1"), t = decodeURIComponent(t) }, this.getNotAfter = function() {
        var t = ASN1HEX.getDecendantHexVByNthList(this.hex, 0, [0, 4, 1]);
        return t = t.replace(/(..)/g, "%$1"), t = decodeURIComponent(t) }, this.readCertPEM = function(t) {
        var e = X509.pemToHex(t),
            r = X509.getPublicKeyHexArrayFromCertHex(e),
            n = new RSAKey;
        n.setPublic(r[0], r[1]), this.subjectPublicKeyRSA = n, this.subjectPublicKeyRSA_hN = r[0], this.subjectPublicKeyRSA_hE = r[1], this.hex = e }, this.readCertPEMWithoutRSAInit = function(t) {
        var e = X509.pemToHex(t),
            r = X509.getPublicKeyHexArrayFromCertHex(e);
        this.subjectPublicKeyRSA.setPublic(r[0], r[1]), this.subjectPublicKeyRSA_hN = r[0], this.subjectPublicKeyRSA_hE = r[1], this.hex = e } }(function() {
    function t(e, r, n) {
        if (e === r) return 0 !== e || 1 / e == 1 / r;
        if (null == e || null == r) return e === r;
        if (e._chain && (e = e._wrapped), r._chain && (r = r._wrapped), e.isEqual && x.isFunction(e.isEqual)) return e.isEqual(r);
        if (r.isEqual && x.isFunction(r.isEqual)) return r.isEqual(e);
        var s = u.call(e);
        if (s != u.call(r)) return !1;
        switch (s) {
            case "[object String]":
                return e == String(r);
            case "[object Number]":
                return e != +e ? r != +r : 0 == e ? 1 / e == 1 / r : e == +r;
            case "[object Date]":
            case "[object Boolean]":
                return +e == +r;
            case "[object RegExp]":
                return e.source == r.source && e.global == r.global && e.multiline == r.multiline && e.ignoreCase == r.ignoreCase }
        if ("object" != typeof e || "object" != typeof r) return !1;
        for (var o = n.length; o--;)
            if (n[o] == e) return !0;
        n.push(e);
        var i = 0,
            l = !0;
        if ("[object Array]" == s) {
            if (i = e.length, l = i == r.length)
                for (; i-- && (l = i in e == i in r && t(e[i], r[i], n));); } else {
            if ("constructor" in e != "constructor" in r || e.constructor != r.constructor) return !1;
            for (var a in e)
                if (x.has(e, a) && (i++, !(l = x.has(r, a) && t(e[a], r[a], n)))) break;
            if (l) {
                for (a in r)
                    if (x.has(r, a) && !i--) break;
                l = !i } }
        return n.pop(), l }
    var e = this,
        r = e._,
        n = {},
        s = Array.prototype,
        o = Object.prototype,
        i = Function.prototype,
        l = s.slice,
        a = s.unshift,
        u = o.toString,
        p = o.hasOwnProperty,
        c = s.forEach,
        h = s.map,
        d = s.reduce,
        f = s.reduceRight,
        g = s.filter,
        m = s.every,
        v = s.some,
        y = s.indexOf,
        b = s.lastIndexOf,
        _ = Array.isArray,
        S = Object.keys,
        A = i.bind,
        x = function(t) {
            return new M(t) };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = x), exports._ = x) : e._ = x, x.VERSION = "1.3.1";
    var R = x.each = x.forEach = function(t, e, r) {
        if (null != t)
            if (c && t.forEach === c) t.forEach(e, r);
            else if (t.length === +t.length) {
            for (var s = 0, o = t.length; o > s; s++)
                if (s in t && e.call(r, t[s], s, t) === n) return } else
            for (var i in t)
                if (x.has(t, i) && e.call(r, t[i], i, t) === n) return };
    x.map = x.collect = function(t, e, r) {
        var n = [];
        return null == t ? n : h && t.map === h ? t.map(e, r) : (R(t, function(t, s, o) { n[n.length] = e.call(r, t, s, o) }), t.length === +t.length && (n.length = t.length), n) }, x.reduce = x.foldl = x.inject = function(t, e, r, n) {
        var s = arguments.length > 2;
        if (null == t && (t = []), d && t.reduce === d) return n && (e = x.bind(e, n)), s ? t.reduce(e, r) : t.reduce(e);
        if (R(t, function(t, o, i) { s ? r = e.call(n, r, t, o, i) : (r = t, s = !0) }), !s) throw new TypeError("Reduce of empty array with no initial value");
        return r }, x.reduceRight = x.foldr = function(t, e, r, n) {
        var s = arguments.length > 2;
        if (null == t && (t = []), f && t.reduceRight === f) return n && (e = x.bind(e, n)), s ? t.reduceRight(e, r) : t.reduceRight(e);
        var o = x.toArray(t).reverse();
        return n && !s && (e = x.bind(e, n)), s ? x.reduce(o, e, r, n) : x.reduce(o, e) }, x.find = x.detect = function(t, e, r) {
        var n;
        return E(t, function(t, s, o) {
            return e.call(r, t, s, o) ? (n = t, !0) : void 0 }), n }, x.filter = x.select = function(t, e, r) {
        var n = [];
        return null == t ? n : g && t.filter === g ? t.filter(e, r) : (R(t, function(t, s, o) {
            e.call(r, t, s, o) && (n[n.length] = t)
        }), n)
    }, x.reject = function(t, e, r) {
        var n = [];
        return null == t ? n : (R(t, function(t, s, o) { e.call(r, t, s, o) || (n[n.length] = t) }), n) }, x.every = x.all = function(t, e, r) {
        var s = !0;
        return null == t ? s : m && t.every === m ? t.every(e, r) : (R(t, function(t, o, i) {
            return (s = s && e.call(r, t, o, i)) ? void 0 : n }), s) };
    var E = x.some = x.any = function(t, e, r) { e || (e = x.identity);
        var s = !1;
        return null == t ? s : v && t.some === v ? t.some(e, r) : (R(t, function(t, o, i) {
            return s || (s = e.call(r, t, o, i)) ? n : void 0 }), !!s) };
    x.include = x.contains = function(t, e) {
        var r = !1;
        return null == t ? r : y && t.indexOf === y ? -1 != t.indexOf(e) : r = E(t, function(t) {
            return t === e }) }, x.invoke = function(t, e) {
        var r = l.call(arguments, 2);
        return x.map(t, function(t) {
            return (x.isFunction(e) ? e || t : t[e]).apply(t, r) }) }, x.pluck = function(t, e) {
        return x.map(t, function(t) {
            return t[e] }) }, x.max = function(t, e, r) {
        if (!e && x.isArray(t)) return Math.max.apply(Math, t);
        if (!e && x.isEmpty(t)) return -1 / 0;
        var n = { computed: -1 / 0 };
        return R(t, function(t, s, o) {
            var i = e ? e.call(r, t, s, o) : t;
            i >= n.computed && (n = { value: t, computed: i }) }), n.value }, x.min = function(t, e, r) {
        if (!e && x.isArray(t)) return Math.min.apply(Math, t);
        if (!e && x.isEmpty(t)) return 1 / 0;
        var n = { computed: 1 / 0 };
        return R(t, function(t, s, o) {
            var i = e ? e.call(r, t, s, o) : t;
            i < n.computed && (n = { value: t, computed: i }) }), n.value }, x.shuffle = function(t) {
        var e, r = [];
        return R(t, function(t, n) { 0 == n ? r[0] = t : (e = Math.floor(Math.random() * (n + 1)), r[n] = r[e], r[e] = t) }), r }, x.sortBy = function(t, e, r) {
        return x.pluck(x.map(t, function(t, n, s) {
            return { value: t, criteria: e.call(r, t, n, s) } }).sort(function(t, e) {
            var r = t.criteria,
                n = e.criteria;
            return n > r ? -1 : r > n ? 1 : 0 }), "value") }, x.groupBy = function(t, e) {
        var r = {},
            n = x.isFunction(e) ? e : function(t) {
                return t[e] };
        return R(t, function(t, e) {
            var s = n(t, e);
            (r[s] || (r[s] = [])).push(t) }), r }, x.sortedIndex = function(t, e, r) { r || (r = x.identity);
        for (var n = 0, s = t.length; s > n;) {
            var o = n + s >> 1;
            r(t[o]) < r(e) ? n = o + 1 : s = o }
        return n }, x.toArray = function(t) {
        return t ? t.toArray ? t.toArray() : x.isArray(t) ? l.call(t) : x.isArguments(t) ? l.call(t) : x.values(t) : [] }, x.size = function(t) {
        return x.toArray(t).length }, x.first = x.head = function(t, e, r) {
        return null == e || r ? t[0] : l.call(t, 0, e) }, x.initial = function(t, e, r) {
        return l.call(t, 0, t.length - (null == e || r ? 1 : e)) }, x.last = function(t, e, r) {
        return null == e || r ? t[t.length - 1] : l.call(t, Math.max(t.length - e, 0)) }, x.rest = x.tail = function(t, e, r) {
        return l.call(t, null == e || r ? 1 : e) }, x.compact = function(t) {
        return x.filter(t, function(t) {
            return !!t }) }, x.flatten = function(t, e) {
        return x.reduce(t, function(t, r) {
            return x.isArray(r) ? t.concat(e ? r : x.flatten(r)) : (t[t.length] = r, t) }, []) }, x.without = function(t) {
        return x.difference(t, l.call(arguments, 1)) }, x.uniq = x.unique = function(t, e, r) {
        var n = r ? x.map(t, r) : t,
            s = [];
        return x.reduce(n, function(r, n, o) {
            return 0 != o && (e === !0 ? x.last(r) == n : x.include(r, n)) || (r[r.length] = n, s[s.length] = t[o]), r }, []), s }, x.union = function() {
        return x.uniq(x.flatten(arguments, !0)) }, x.intersection = x.intersect = function(t) {
        var e = l.call(arguments, 1);
        return x.filter(x.uniq(t), function(t) {
            return x.every(e, function(e) {
                return x.indexOf(e, t) >= 0 }) }) }, x.difference = function(t) {
        var e = x.flatten(l.call(arguments, 1));
        return x.filter(t, function(t) {
            return !x.include(e, t) }) }, x.zip = function() {
        for (var t = l.call(arguments), e = x.max(x.pluck(t, "length")), r = new Array(e), n = 0; e > n; n++) r[n] = x.pluck(t, "" + n);
        return r }, x.indexOf = function(t, e, r) {
        if (null == t) return -1;
        var n, s;
        if (r) return n = x.sortedIndex(t, e), t[n] === e ? n : -1;
        if (y && t.indexOf === y) return t.indexOf(e);
        for (n = 0, s = t.length; s > n; n++)
            if (n in t && t[n] === e) return n;
        return -1 }, x.lastIndexOf = function(t, e) {
        if (null == t) return -1;
        if (b && t.lastIndexOf === b) return t.lastIndexOf(e);
        for (var r = t.length; r--;)
            if (r in t && t[r] === e) return r;
        return -1 }, x.range = function(t, e, r) { arguments.length <= 1 && (e = t || 0, t = 0), r = arguments[2] || 1;
        for (var n = Math.max(Math.ceil((e - t) / r), 0), s = 0, o = new Array(n); n > s;) o[s++] = t, t += r;
        return o };
    var w = function() {};
    x.bind = function(t, e) {
        if (t) {
            var r, n;
            if (t.bind === A && A) return A.apply(t, l.call(arguments, 1));
            if (!x.isFunction(t)) throw new TypeError;
            return n = l.call(arguments, 2), r = function() {
                if (!(this instanceof r)) return t.apply(e, n.concat(l.call(arguments)));
                w.prototype = t.prototype;
                var s = new w,
                    o = t.apply(s, n.concat(l.call(arguments)));
                return Object(o) === o ? o : s } } }, x.bindAll = function(t) {
        var e = l.call(arguments, 1);
        return 0 == e.length && (e = x.functions(t)), R(e, function(e) { t[e] = x.bind(t[e], t) }), t }, x.memoize = function(t, e) {
        var r = {};
        return e || (e = x.identity),
            function() {
                var n = e.apply(this, arguments);
                return x.has(r, n) ? r[n] : r[n] = t.apply(this, arguments) } }, x.delay = function(t, e) {
        var r = l.call(arguments, 2);
        return setTimeout(function() {
            return t.apply(t, r) }, e) }, x.defer = function(t) {
        return x.delay.apply(x, [t, 1].concat(l.call(arguments, 1))) }, x.throttle = function(t, e) {
        var r, n, s, o, i, l = x.debounce(function() { i = o = !1 }, e);
        return function() { r = this, n = arguments;
            var a = function() { s = null, i && t.apply(r, n), l() };
            s || (s = setTimeout(a, e)), o ? i = !0 : t.apply(r, n), l(), o = !0 } }, x.debounce = function(t, e) {
        var r;
        return function() {
            var n = this,
                s = arguments,
                o = function() { r = null, t.apply(n, s) };
            clearTimeout(r), r = setTimeout(o, e) } }, x.once = function(t) {
        var e, r = !1;
        return function() {
            return r ? e : (r = !0, e = t.apply(this, arguments)) } }, x.wrap = function(t, e) {
        return function() {
            var r = [t].concat(l.call(arguments, 0));
            return e.apply(this, r) } }, x.compose = function() {
        var t = arguments;
        return function() {
            for (var e = arguments, r = t.length - 1; r >= 0; r--) e = [t[r].apply(this, e)];
            return e[0] } }, x.after = function(t, e) {
        return 0 >= t ? e() : function() {
            return --t < 1 ? e.apply(this, arguments) : void 0 } }, x.keys = S || function(t) {
        if (t !== Object(t)) throw new TypeError("Invalid object");
        var e = [];
        for (var r in t) x.has(t, r) && (e[e.length] = r);
        return e }, x.values = function(t) {
        return x.map(t, x.identity) }, x.functions = x.methods = function(t) {
        var e = [];
        for (var r in t) x.isFunction(t[r]) && e.push(r);
        return e.sort() }, x.extend = function(t) {
        return R(l.call(arguments, 1), function(e) {
            for (var r in e) t[r] = e[r] }), t }, x.defaults = function(t) {
        return R(l.call(arguments, 1), function(e) {
            for (var r in e) null == t[r] && (t[r] = e[r]) }), t }, x.clone = function(t) {
        return x.isObject(t) ? x.isArray(t) ? t.slice() : x.extend({}, t) : t }, x.tap = function(t, e) {
        return e(t), t }, x.isEqual = function(e, r) {
        return t(e, r, []) }, x.isEmpty = function(t) {
        if (x.isArray(t) || x.isString(t)) return 0 === t.length;
        for (var e in t)
            if (x.has(t, e)) return !1;
        return !0 }, x.isElement = function(t) {
        return !(!t || 1 != t.nodeType) }, x.isArray = _ || function(t) {
        return "[object Array]" == u.call(t) }, x.isObject = function(t) {
        return t === Object(t) }, x.isArguments = function(t) {
        return "[object Arguments]" == u.call(t) }, x.isArguments(arguments) || (x.isArguments = function(t) {
        return !(!t || !x.has(t, "callee")) }), x.isFunction = function(t) {
        return "[object Function]" == u.call(t) }, x.isString = function(t) {
        return "[object String]" == u.call(t) }, x.isNumber = function(t) {
        return "[object Number]" == u.call(t) }, x.isFinite = function(t) {
        return x.isNumber(t) && isFinite(t) }, x.isNaN = function(t) {
        return t !== t }, x.isBoolean = function(t) {
        return t === !0 || t === !1 || "[object Boolean]" == u.call(t) }, x.isDate = function(t) {
        return "[object Date]" == u.call(t) }, x.isRegExp = function(t) {
        return "[object RegExp]" == u.call(t) }, x.isNull = function(t) {
        return null === t }, x.isUndefined = function(t) {
        return void 0 === t }, x.has = function(t, e) {
        return p.call(t, e) }, x.noConflict = function() {
        return e._ = r, this }, x.identity = function(t) {
        return t }, x.times = function(t, e, r) {
        for (var n = 0; t > n; n++) e.call(r, n) }, x.escape = function(t) {
        return ("" + t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;") }, x.mixin = function(t) { R(x.functions(t), function(e) { I(e, x[e] = t[e]) }) };
    var P = 0;
    x.uniqueId = function(t) {
        var e = P++;
        return t ? t + e : e }, x.templateSettings = { evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g };
    var T = /.^/,
        C = function(t) {
            return t.replace(/\\\\/g, "\\").replace(/\\'/g, "'") };
    x.template = function(t, e) {
        var r = x.templateSettings,
            n = "var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('" + t.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(r.escape || T, function(t, e) {
                return "',_.escape(" + C(e) + "),'" }).replace(r.interpolate || T, function(t, e) {
                return "'," + C(e) + ",'" }).replace(r.evaluate || T, function(t, e) {
                return "');" + C(e).replace(/[\r\n\t]/g, " ") + ";__p.push('" }).replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + "');}return __p.join('');",
            s = new Function("obj", "_", n);
        return e ? s(e, x) : function(t) {
            return s.call(this, t, x) } }, x.chain = function(t) {
        return x(t).chain() };
    var M = function(t) { this._wrapped = t };
    x.prototype = M.prototype;
    var O = function(t, e) {
            return e ? x(t).chain() : t },
        I = function(t, e) { M.prototype[t] = function() {
                var t = l.call(arguments);
                return a.call(t, this._wrapped), O(e.apply(x, t), this._chain) } };
    x.mixin(x), R(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(t) {
        var e = s[t];
        M.prototype[t] = function() {
            var r = this._wrapped;
            e.apply(r, arguments);
            var n = r.length;
            return "shift" != t && "splice" != t || 0 !== n || delete r[0], O(r, this._chain) } }), R(["concat", "join", "slice"], function(t) {
        var e = s[t];
        M.prototype[t] = function() {
            return O(e.apply(this._wrapped, arguments), this._chain) } }), M.prototype.chain = function() {
        return this._chain = !0, this }, M.prototype.value = function() {
        return this._wrapped }
}).call(this), d20.utils = { stattracker: {} }, global.d20ext = global.d20ext || {}, global.d20ext.utils = d20.utils,
    function() { d20.utils.strip_tags = function(t, e, r) { r || void 0 === e || (t = html_sanitize(t, function(t, e, r, n) {
                var s = t.toString();
                if (n && "a" === n.XML_TAG) return s;
                var o = "https://s3.amazonaws.com/files.d20.io",
                    i = "http://imgsrv.roll20.net",
                    l = "https://imgsrv.roll20.net";
                return s.substring(0, o.length) === o || s.substring(0, i.length) === i || s.substring(0, l.length) === l ? s : /^https?:\/\//.test(s) ? "http://imgsrv.roll20.net/?src=" + escape(s.replace("http://", "").replace("https://", "")) : "" }, function(t) {
                var e = t.split(" ");
                return _.each(e, function(t, r) { e[r] = "userscript-" === t.substring(0, 11) || "sheet-" === t.substring(0, 6) ? t : "userscript-" + t }), e.join(" ") })), e = (((e || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join("");
            var n = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
                s = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
            return t.replace(s, "").replace(n, function(t, r) {
                return e.indexOf("<" + r.toLowerCase() + ">") > -1 ? t : "" }) }, d20.utils.htmlAllowed = "<code><span><div><label><a><br><br /><p><b><i><del><strike><u><img><video><audio><param><blockquote><mark><cite><small><ul><ol><li><hr><dl><dt><dd><sup><sub><big><pre><code><figure><figcaption><strong><em><table><tr><td><th><tbody><thead><tfoot><caption><h1><h2><h3><h4><h5><h6>", d20.utils.handleHTMLInput = function(t) {
            return escape(d20.utils.strip_tags(d20.utils.autoLink(t), d20.utils.htmlAllowed)) }, d20.utils.handleHTMLOutput = function(t) {
            return d20.utils.strip_tags(unescape(t), d20.utils.htmlAllowed) }, d20.utils.showOverQuota = function() {
            var t = $("<div><p>We're sorry, but it looks like you've uploaded more than your allotted quota of storage space on Roll20. You can increase your quota by <a href='/account/supporter/?quotainapp' target='_blank'>becoming a Plus user</a> (or upgrading your Plus account if you already have one), or by <a href='http://help.roll20.net/sidebar-art-library/' target='_blank'>deleting items from your Art Library</a>.</div>");
            t.dialog({ modal: !0, title: "Quota Exceeded", buttons: { "Upgrade Account": function() { global.open("/account/supporter/?quotainapp"), t.dialog("destroy") }, "No Thanks": function() { t.dialog("destroy") } }, beforeClose: function() { t.dialog("destroy") } }) }, d20.utils.showBadConvert = function() {
            var t = $("<div><p>There was an error trying to convert the PDF. Be sure you didn't specify an invalid page number. It's also possible the PDF is corrupted or isn't supported by our conversion software.</div>");
            t.dialog({ modal: !0, title: "PDF Conversion Error", buttons: { "Drat!": function() { t.dialog("destroy") } }, beforeClose: function() { t.dialog("destroy") } }) }, d20.utils.setupAvatar = function(t, e) { t.bind("uploadcomplete", function(t, r) {
                return t.stopPropagation(), "overquota" == r ? (d20.utils.showOverQuota(), !1) : (e.updateModel(), void e.model.save({ avatar: r.base.replace("/original.", "/med.") + (-1 === r.base.indexOf("?") ? "?" + Math.floor((new Date).getTime() / 1e3) : "") })) }), t.dndUploader({ url: "/image_library/newupload", method: "POST", allowMultiple: !1 }), t.bind("removeimage", function() { e.updateModel(), e.model.save({ avatar: "" }) }), t.on("click", ".remove", function() { t.trigger("removeimage") }), t.droppable({ drop: function(e, r) { console.log("Dropped onto avatar!"), e.originalEvent.dropHandled = !0, t.trigger("uploadcomplete", [{ base: r.draggable.attr("data-fullsizeurl") }, !0]), e.preventDefault(), e.stopPropagation() }, greedy: !0, accept: ".resultimage" }) };
        d20.utils.defaultRedactorSettings = { minHeight: 50, maxHeight: 300, plugins: ["fontcolor"], buttons: ["formatting", "|", "bold", "italic", "deleted", "|", "unorderedlist", "orderedlist", "outdent", "indent", "|", "table", "link", "|", "alignment", "|", "horizontalrule", "|"], convertDivs: !0, linebreaks: !0, tidyHtml: !1, dragUpload: !1 }, d20.utils.addCSSRules = function(t) {
            var e = document.createElement("style");
            document.getElementsByTagName("head")[0].appendChild(e), global.createPopup || e.appendChild(document.createTextNode(""));
            var r = document.styleSheets[document.styleSheets.length - 1];
            for (selector in t)
                if (r.insertRule) try { r.insertRule(selector + t[selector], r.cssRules.length) } catch (n) {} else try { r.addRule(selector, t[selector]) } catch (n) { console.log("Error addding rule!"), console.log(n) } }, d20.utils.defaultDiceTokens = { d4: ["https://s3.amazonaws.com/files.d20.io/images/779542/DEYaBdP8w9B1CUSK26im0A/thumb.png?1363050056", "https://s3.amazonaws.com/files.d20.io/images/779540/P7yKde5fyGZCB1ud70UOzA/thumb.png?1363050056", "https://s3.amazonaws.com/files.d20.io/images/779539/AO4m-45bGw5yOcnZXUAn9g/thumb.png?1363050056", "https://s3.amazonaws.com/files.d20.io/images/779541/oWA-hmBAHNAijceHr8k-3A/thumb.png?1363050056"], d6: ["https://s3.amazonaws.com/files.d20.io/images/779533/-gS85HUaXIvmE5SjGpoH4w/thumb.png?1363049998", "https://s3.amazonaws.com/files.d20.io/images/779535/vkc_PT4z-d_ON1MvfHaCiA/thumb.png?1363049999", "https://s3.amazonaws.com/files.d20.io/images/779534/mHDadFirie4L12_ii-HYqQ/thumb.png?1363049998", "https://s3.amazonaws.com/files.d20.io/images/779531/nXqp2BhdwVsQn7cDR3cMlg/thumb.png?1363049998", "https://s3.amazonaws.com/files.d20.io/images/779532/nQD5_IXYLWN7YCjnd5zugA/thumb.png?1363049998", "https://s3.amazonaws.com/files.d20.io/images/779536/ttiwwiWE2PVkhD2d7fV3GA/thumb.png?1363049999"], d8: ["https://s3.amazonaws.com/files.d20.io/images/779514/GPCh5vqdSwvt_ANka3yhaw/thumb.png?1363049802", "https://s3.amazonaws.com/files.d20.io/images/779517/nnuf1Pe2Fq70BIs9FGI7mQ/thumb.png?1363049802", "https://s3.amazonaws.com/files.d20.io/images/779516/WnwuwT7yb5VM3-KiJY3GOg/thumb.png?1363049802", "https://s3.amazonaws.com/files.d20.io/images/779515/Gx21buVd6d6onPsALrGFWQ/thumb.png?1363049802", "https://s3.amazonaws.com/files.d20.io/images/779518/4LqfUGiX8sBXrX9b5gUnLw/thumb.png?1363049803", "https://s3.amazonaws.com/files.d20.io/images/779519/YOR5Wav0-3-L1fm4vD-LFQ/thumb.png?1363049803", "https://s3.amazonaws.com/files.d20.io/images/779522/dGFXXsEJz0EPA8dRpZvOzA/thumb.png?1363049804", "https://s3.amazonaws.com/files.d20.io/images/779521/QXm6GcIhK6zTdMvJZVS8Og/thumb.png?1363049804"], d10: ["https://s3.amazonaws.com/files.d20.io/images/779498/fjup5Fz4iV-TFKxV9z1Qtg/thumb.png?1363049717", "https://s3.amazonaws.com/files.d20.io/images/779500/ug7m7g1rII05ZFzyTrkRmw/thumb.png?1363049717", "https://s3.amazonaws.com/files.d20.io/images/779499/QNZR5kGieM1x00yQvSYYbg/thumb.png?1363049717", "https://s3.amazonaws.com/files.d20.io/images/779497/tkz2552-MqV8a_woAD8S4A/thumb.png?1363049717", "https://s3.amazonaws.com/files.d20.io/images/779501/xKjqIxXzibpcx3Lp7UH6qg/thumb.png?1363049718", "https://s3.amazonaws.com/files.d20.io/images/779502/Bpc1QATzO293LvGS3neBsQ/thumb.png?1363049718", "https://s3.amazonaws.com/files.d20.io/images/779504/Bpw24T8na0nJNFdTKZX5aw/thumb.png?1363049718", "https://s3.amazonaws.com/files.d20.io/images/779503/ukQbc7uDKfl62ng2EO6h6g/thumb.png?1363049719", "https://s3.amazonaws.com/files.d20.io/images/779505/23948Y6_O0Bc0RuIve3BbA/thumb.png?1363049719", "https://s3.amazonaws.com/files.d20.io/images/779506/VhwbFVDm2KOte5h2p97n7w/thumb.png?1363049719"], d12: ["https://s3.amazonaws.com/files.d20.io/images/779476/FRkaR6XvyzUuZb0ZB7ysCA/thumb.png?1363049489", "https://s3.amazonaws.com/files.d20.io/images/779474/UyTKDHxf-fU1zC3w6udl0w/thumb.png?1363049489", "https://s3.amazonaws.com/files.d20.io/images/779475/kUK2UmBaD2No00Gp4Q_OCQ/thumb.png?1363049489", "https://s3.amazonaws.com/files.d20.io/images/779477/OVnJDjAkMPLk29hjpFjUvw/thumb.png?1363049489", "https://s3.amazonaws.com/files.d20.io/images/779478/2la9taZk_vqdKItYZ6JEfA/thumb.png?1363049490", "https://s3.amazonaws.com/files.d20.io/images/779479/fa8f9OVIBt79oETji8C8Lg/thumb.png?1363049490", "https://s3.amazonaws.com/files.d20.io/images/779480/CTuw9Yiijq24ra3G9YMuPA/thumb.png?1363049490", "https://s3.amazonaws.com/files.d20.io/images/779481/d4onnc7NOAbNG5JbiL9mbg/thumb.png?1363049491", "https://s3.amazonaws.com/files.d20.io/images/779482/Oy2dTkB3-NlxiMsTRj78nw/thumb.png?1363049491", "https://s3.amazonaws.com/files.d20.io/images/779483/mO_KU8nlO7GDQKc2J_aNeg/thumb.png?1363049491", "https://s3.amazonaws.com/files.d20.io/images/779484/3MYG5dYJhiKXsRZtSUpHZw/thumb.png?1363049491", "https://s3.amazonaws.com/files.d20.io/images/779485/VxA3umVDmYrH5A_VBecUIQ/thumb.png?1363049492"], d20: ["https://s3.amazonaws.com/files.d20.io/images/779445/OfLXGnbkNr2qKg1Qqk4cPg/thumb.png?1363049314", "https://s3.amazonaws.com/files.d20.io/images/779447/br4TdShbuMIZ-D-lyeXsKA/thumb.png?1363049315", "https://s3.amazonaws.com/files.d20.io/images/779454/2ARsJLoP4tExbCWrRaaxQg/thumb.png?1363049318", "https://s3.amazonaws.com/files.d20.io/images/779444/3pryVOKRxMCBisEHpH3LWg/thumb.png?1363049314", "https://s3.amazonaws.com/files.d20.io/images/779446/Yk4sSF3eWfnpeJd4DQpV2A/thumb.png?1363049314", "https://s3.amazonaws.com/files.d20.io/images/779450/tdvjVviFHhM_KxjFRQomhA/thumb.png?1363049316", "https://s3.amazonaws.com/files.d20.io/images/779456/twbHlPq0CFjFCpAyS59CTQ/thumb.png?1363049319", "https://s3.amazonaws.com/files.d20.io/images/779449/PPHDirZfEowhjBHxQdxJiw/thumb.png?1363049315", "https://s3.amazonaws.com/files.d20.io/images/779448/1SpNrrunpHwrNbsKcqpCzQ/thumb.png?1363049315", "https://s3.amazonaws.com/files.d20.io/images/779458/VsueBYqaDlvp9BjlXl9wMQ/thumb.png?1363049320", "https://s3.amazonaws.com/files.d20.io/images/779451/nWqhH9iMimUAJh_9jOFEog/thumb.png?1363049316", "https://s3.amazonaws.com/files.d20.io/images/779452/TvksvU6AZm2wmpEQ2HkBlQ/thumb.png?1363049317", "https://s3.amazonaws.com/files.d20.io/images/779459/L4pwmqIbQk0TfaCMExrYxQ/thumb.png?1363049320", "https://s3.amazonaws.com/files.d20.io/images/779453/MDmeMWOQ_lARfvFoT1n3KQ/thumb.png?1363049317", "https://s3.amazonaws.com/files.d20.io/images/779460/my8VEGyYcJIHZN2uXP6QXQ/thumb.png?1363049321", "https://s3.amazonaws.com/files.d20.io/images/779455/nuz5AefdQSB6H4mvUXoqhw/thumb.png?1363049318", "https://s3.amazonaws.com/files.d20.io/images/779457/kQBunq7iXGmHNqZQCa5MCA/thumb.png?1363049319", "https://s3.amazonaws.com/files.d20.io/images/779463/6n_z7Gwd7eacm3-HC-f-mg/thumb.png?1363049322", "https://s3.amazonaws.com/files.d20.io/images/779462/aVz3qCe2QM2nWhn3BoT9rg/thumb.png?1363049321", "https://s3.amazonaws.com/files.d20.io/images/779461/4PuFJYddJWJjj4uL5S3mxQ/thumb.png?1363049321"] };
        for (var t in d20.utils.defaultDiceTokens) d20.utils.defaultDiceTokens[t] = _.map(d20.utils.defaultDiceTokens[t], function(t) {
            return escape(t + "") });
        d20.utils.hexToRgb = function(t) {
            return t[4] || (t = t.replace(/./g, "$&$&").slice(1)), ["0x" + t[1] + t[2] | 0, "0x" + t[3] + t[4] | 0, "0x" + t[5] + t[6] | 0] };
        var e = {},
            r = function() { console.log("Do refresh link cache!");
                var t = {};
                d20.Campaign.characters.each(function(e) {
                    var r = e.get("inplayerjournals").split(",");
                    (global.is_gm || -1 !== _.indexOf(r, "all") || global.currentPlayer && -1 !== _.indexOf(r, global.currentPlayer.id)) && (t[e.get("name").toLowerCase()] = { type: "character", id: e.id }) }), d20.Campaign.handouts.each(function(e) {
                    var r = e.get("inplayerjournals").split(",");
                    (global.is_gm || -1 !== _.indexOf(r, "all") || global.currentPlayer && -1 !== _.indexOf(r, global.currentPlayer.id)) && (t[e.get("name").toLowerCase()] = { type: "handout", id: e.id }) }), e = t };
        d20.utils.refreshLinkCache = _.debounce(r, 100), d20.utils.autoLink = function(t) {
            var r = /\[[^\]]+\]/g;
            return t = t.replace(r, function(t) { t = t.substring(1, t.length - 1);
                var r = e[t.toLowerCase()];
                return r ? "<a href='http://journal.roll20.net/" + r.type + "/" + r.id + "'>" + t + "</a>" : "[" + t + "]" }) };
        var n = $("#textchat-notifier"),
            s = !1;
        d20.utils.textchatNotify = function(t, e) {
            (s !== !0 || e === !0) && (t === !1 ? n.hide() : n.show().text(t), e === !0 && (s = t !== !1 ? !0 : !1)) }, d20.utils.getParentsUntil = function(t, e, r) {
            var n = [];
            if (r) var s = r.charAt(0);
            for (; t && t !== document && (!e || e !== t); t = t.parentNode) r ? ("." === s && t.classList.contains(r.substr(1)) && n.push(t), "#" === s && t.id === r.substr(1) && n.push(t), "[" === s && t.hasAttribute(r.substr(1, r.length - 1)) && n.push(t), t.tagName.toLowerCase() === r && n.push(t)) : n.push(t);
            return n } }(), global.ucfirst = function(t) {
        return t.charAt(0).toUpperCase() + t.slice(1) },
    function(t, e, r) {
        function n(e, r) { this.element = e, this.options = t.extend({}, o, r), this._defaults = o, this._name = s, this.init() }
        var s = "addClear",
            o = { closeSymbol: "&#10006;", color: "#CCC", top: -1, right: 8, returnFocus: !0, showOnLoad: !1, onClear: null, hideOnBlur: !1, tabbable: !0 };
        n.prototype = { init: function() {
                var e, n = t(this.element),
                    s = this,
                    o = this.options;
                n.wrap("<span style='position:relative;' class='add-clear-span'></span>");
                var i = o.tabbable ? "" : " tabindex='-1'";
                e = t("<a href='#clear' style='display: none;'" + i + ">" + o.closeSymbol + "</a>"), n.after(e), n.next().css({ color: o.color, "text-decoration": "none", display: "none", "line-height": 1, overflow: "hidden", position: "absolute", right: o.right, top: o.top }, this), n.val().length >= 1 && o.showOnLoad === !0 && e.css({ display: "block" }), n.focus(function() { t(this).val().length >= 1 && e.css({ display: "block" }) }), n.blur(function(t) { o.hideOnBlur && setTimeout(function() {
                        var n = t.relatedTarget || t.explicitOriginalTarget || r.activeElement;
                        n !== e[0] && e.css({ display: "none" }) }, 0) });
                var l = function() { e.css(t(this).val().length >= 1 ? { display: "block" } : { display: "none" }) },
                    a = function() { n.off("keyup", l), n.off("cut", l), a = l, l.call(this) };
                n.on("keyup", l), n.on("cut", function() {
                    var t = this;
                    setTimeout(function() { l.call(t) }, 0) }), n.on("input", function() { a.call(this) }), o.hideOnBlur && e.blur(function() { e.css({ display: "none" }) }), e.click(function(e) {
                    var r = t(s.element);
                    r.val("").trigger("keyup"), t(this).css({ display: "none" }), o.returnFocus === !0 && r.focus(), o.onClear && o.onClear(r), e.preventDefault() }) } }, t.fn[s] = function(e) {
            return this.each(function() { t.data(this, "plugin_" + s) || t.data(this, "plugin_" + s, new n(this, e)) }) } }(jQuery, global, document),
    function(t, e, r, n, s, o, i) {
        function l(t) {
            var e, n, s = this,
                o = t.length,
                i = 0,
                l = s.i = s.j = s.m = 0;
            for (s.S = [], s.c = [], o || (t = [o++]); r > i;) s.S[i] = i++;
            for (i = 0; r > i; i++) e = s.S[i], l = p(l + e + t[i % o]), n = s.S[l], s.S[i] = n, s.S[l] = e;
            s.g = function(t) {
                var e = s.S,
                    n = p(s.i + 1),
                    o = e[n],
                    i = p(s.j + o),
                    l = e[i];
                e[n] = l, e[i] = o;
                for (var a = e[p(o + l)]; --t;) n = p(n + 1), o = e[n], i = p(i + o), l = e[i], e[n] = l, e[i] = o, a = a * r + e[p(o + l)];
                return s.i = n, s.j = i, a }, s.g(r) }

        function a(t, e, r, n, s) {
            if (r = [], s = typeof t, e && "object" == s)
                for (n in t)
                    if (n.indexOf("S") < 5) try { r.push(a(t[n], e - 1)) } catch (o) {}
                    return r.length ? r : t + ("string" != s ? "\x00" : "") }

        function u(t, e, r, n) {
            for (t += "", r = 0, n = 0; n < t.length; n++) e[p(n)] = p((r ^= 19 * e[p(n)]) + t.charCodeAt(n));
            t = "";
            for (n in e) t += String.fromCharCode(e[n]);
            return t }

        function p(t) {
            return t & r - 1 }
        e.seedrandom = function(p, c) {
            var h, d = [];
            p = u(a(c ? [p, t] : arguments.length ? p : [(new Date).getTime(), t, global], 3), d), h = new l(d), u(h.S, t), e.random = function() {
                for (var t = h.g(n), e = i, l = 0; s > t;) t = (t + l) * r, e *= r, l = h.g(1);
                for (; t >= o;) t /= 2, e /= 2, l >>>= 1;
                return (t + l) / e };
            var f = function(t) {
                if (0 > t) throw "n must be non-negative";
                var e = Math.max(Math.ceil(Math.log(t) / Math.log(r)), 1);
                if (e > n) throw "n cannot be greater than " + r + "^" + n;
                var s, o = Math.pow(r, e),
                    i = t * Math.floor(o / t),
                    l = 0;
                do s = h.g(e), l++; while (s >= i && 100 > l);
                return s % t };
            return Math.randomInt = f, f }, i = e.pow(r, n), s = e.pow(2, s), o = 2 * s, u(e.random(), t) }([], Math, 256, 6, 52);
var dbits, canary = 0xdeadbeefcafe,
    j_lm = 15715070 == (16777215 & canary);
j_lm && "Microsoft Internet Explorer" == navigator.appName ? (BigInteger.prototype.am = am2, dbits = 30) : j_lm && "Netscape" != navigator.appName ? (BigInteger.prototype.am = am1, dbits = 26) : (BigInteger.prototype.am = am3, dbits = 28), BigInteger.prototype.DB = dbits, BigInteger.prototype.DM = (1 << dbits) - 1, BigInteger.prototype.DV = 1 << dbits;
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP), BigInteger.prototype.F1 = BI_FP - dbits, BigInteger.prototype.F2 = 2 * dbits - BI_FP;
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz",
    BI_RC = new Array,
    rr, vv;
for (rr = "0".charCodeAt(0), vv = 0; 9 >= vv; ++vv) BI_RC[rr++] = vv;
for (rr = "a".charCodeAt(0), vv = 10; 36 > vv; ++vv) BI_RC[rr++] = vv;
for (rr = "A".charCodeAt(0), vv = 10; 36 > vv; ++vv) BI_RC[rr++] = vv;
Classic.prototype.convert = cConvert, Classic.prototype.revert = cRevert, Classic.prototype.reduce = cReduce, Classic.prototype.mulTo = cMulTo, Classic.prototype.sqrTo = cSqrTo, Montgomery.prototype.convert = montConvert, Montgomery.prototype.revert = montRevert, Montgomery.prototype.reduce = montReduce, Montgomery.prototype.mulTo = montMulTo, Montgomery.prototype.sqrTo = montSqrTo, BigInteger.prototype.copyTo = bnpCopyTo, BigInteger.prototype.fromInt = bnpFromInt, BigInteger.prototype.fromString = bnpFromString, BigInteger.prototype.clamp = bnpClamp, BigInteger.prototype.dlShiftTo = bnpDLShiftTo, BigInteger.prototype.drShiftTo = bnpDRShiftTo, BigInteger.prototype.lShiftTo = bnpLShiftTo, BigInteger.prototype.rShiftTo = bnpRShiftTo, BigInteger.prototype.subTo = bnpSubTo, BigInteger.prototype.multiplyTo = bnpMultiplyTo, BigInteger.prototype.squareTo = bnpSquareTo, BigInteger.prototype.divRemTo = bnpDivRemTo, BigInteger.prototype.invDigit = bnpInvDigit, BigInteger.prototype.isEven = bnpIsEven, BigInteger.prototype.exp = bnpExp, BigInteger.prototype.toString = bnToString, BigInteger.prototype.negate = bnNegate, BigInteger.prototype.abs = bnAbs, BigInteger.prototype.compareTo = bnCompareTo, BigInteger.prototype.bitLength = bnBitLength, BigInteger.prototype.mod = bnMod, BigInteger.prototype.modPowInt = bnModPowInt, BigInteger.ZERO = nbv(0), BigInteger.ONE = nbv(1), NullExp.prototype.convert = nNop, NullExp.prototype.revert = nNop, NullExp.prototype.mulTo = nMulTo, NullExp.prototype.sqrTo = nSqrTo, Barrett.prototype.convert = barrettConvert, Barrett.prototype.revert = barrettRevert, Barrett.prototype.reduce = barrettReduce, Barrett.prototype.mulTo = barrettMulTo, Barrett.prototype.sqrTo = barrettSqrTo;
var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997],
    lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
BigInteger.prototype.chunkSize = bnpChunkSize, BigInteger.prototype.toRadix = bnpToRadix, BigInteger.prototype.fromRadix = bnpFromRadix, BigInteger.prototype.fromNumber = bnpFromNumber, BigInteger.prototype.bitwiseTo = bnpBitwiseTo, BigInteger.prototype.changeBit = bnpChangeBit, BigInteger.prototype.addTo = bnpAddTo, BigInteger.prototype.dMultiply = bnpDMultiply, BigInteger.prototype.dAddOffset = bnpDAddOffset, BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo, BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo, BigInteger.prototype.modInt = bnpModInt, BigInteger.prototype.millerRabin = bnpMillerRabin, BigInteger.prototype.clone = bnClone, BigInteger.prototype.intValue = bnIntValue, BigInteger.prototype.byteValue = bnByteValue, BigInteger.prototype.shortValue = bnShortValue, BigInteger.prototype.signum = bnSigNum, BigInteger.prototype.toByteArray = bnToByteArray, BigInteger.prototype.equals = bnEquals, BigInteger.prototype.min = bnMin, BigInteger.prototype.max = bnMax, BigInteger.prototype.and = bnAnd, BigInteger.prototype.or = bnOr, BigInteger.prototype.xor = bnXor, BigInteger.prototype.andNot = bnAndNot, BigInteger.prototype.not = bnNot, BigInteger.prototype.shiftLeft = bnShiftLeft, BigInteger.prototype.shiftRight = bnShiftRight, BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit, BigInteger.prototype.bitCount = bnBitCount, BigInteger.prototype.testBit = bnTestBit, BigInteger.prototype.setBit = bnSetBit, BigInteger.prototype.clearBit = bnClearBit, BigInteger.prototype.flipBit = bnFlipBit, BigInteger.prototype.add = bnAdd, BigInteger.prototype.subtract = bnSubtract, BigInteger.prototype.multiply = bnMultiply, BigInteger.prototype.divide = bnDivide, BigInteger.prototype.remainder = bnRemainder, BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder, BigInteger.prototype.modPow = bnModPow, BigInteger.prototype.modInverse = bnModInverse, BigInteger.prototype.pow = bnPow, BigInteger.prototype.gcd = bnGCD, BigInteger.prototype.isProbablePrime = bnIsProbablePrime, BigInteger.prototype.square = bnSquare;
var SHA1_SIZE = 20;
RSAKey.prototype.doPublic = RSADoPublic, RSAKey.prototype.setPublic = RSASetPublic, RSAKey.prototype.encrypt = RSAEncrypt, RSAKey.prototype.encryptOAEP = RSAEncryptOAEP, RSAKey.prototype.type = "RSA";
var SHA1_SIZE = 20;
RSAKey.prototype.doPrivate = RSADoPrivate, RSAKey.prototype.setPrivate = RSASetPrivate, RSAKey.prototype.setPrivateEx = RSASetPrivateEx, RSAKey.prototype.generate = RSAGenerate, RSAKey.prototype.decrypt = RSADecrypt, RSAKey.prototype.decryptOAEP = RSADecryptOAEP;
var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    b64pad = "=",
    CryptoJS = CryptoJS || function(t, e) {
        var r = {},
            n = r.lib = {},
            s = n.Base = function() {
                function t() {}
                return { extend: function(e) { t.prototype = this;
                        var r = new t;
                        return e && r.mixIn(e), r.hasOwnProperty("init") || (r.init = function() { r.$super.init.apply(this, arguments) }), r.init.prototype = r, r.$super = this, r }, create: function() {
                        var t = this.extend();
                        return t.init.apply(t, arguments), t }, init: function() {}, mixIn: function(t) {
                        for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e]);
                        t.hasOwnProperty("toString") && (this.toString = t.toString) }, clone: function() {
                        return this.init.prototype.extend(this) } } }(),
            o = n.WordArray = s.extend({ init: function(t, r) { t = this.words = t || [], this.sigBytes = r != e ? r : 4 * t.length }, toString: function(t) {
                    return (t || l).stringify(this) }, concat: function(t) {
                    var e = this.words,
                        r = t.words,
                        n = this.sigBytes,
                        s = t.sigBytes;
                    if (this.clamp(), n % 4)
                        for (var o = 0; s > o; o++) {
                            var i = r[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                            e[n + o >>> 2] |= i << 24 - (n + o) % 4 * 8 } else if (r.length > 65535)
                            for (var o = 0; s > o; o += 4) e[n + o >>> 2] = r[o >>> 2];
                        else e.push.apply(e, r);
                    return this.sigBytes += s, this }, clamp: function() {
                    var e = this.words,
                        r = this.sigBytes;
                    e[r >>> 2] &= 4294967295 << 32 - r % 4 * 8, e.length = t.ceil(r / 4) }, clone: function() {
                    var t = s.clone.call(this);
                    return t.words = this.words.slice(0), t }, random: function(e) {
                    for (var r = [], n = 0; e > n; n += 4) r.push(4294967296 * t.random() | 0);
                    return new o.init(r, e) } }),
            i = r.enc = {},
            l = i.Hex = { stringify: function(t) {
                    for (var e = t.words, r = t.sigBytes, n = [], s = 0; r > s; s++) {
                        var o = e[s >>> 2] >>> 24 - s % 4 * 8 & 255;
                        n.push((o >>> 4).toString(16)), n.push((15 & o).toString(16)) }
                    return n.join("") }, parse: function(t) {
                    for (var e = t.length, r = [], n = 0; e > n; n += 2) r[n >>> 3] |= parseInt(t.substr(n, 2), 16) << 24 - n % 8 * 4;
                    return new o.init(r, e / 2) } },
            a = i.Latin1 = { stringify: function(t) {
                    for (var e = t.words, r = t.sigBytes, n = [], s = 0; r > s; s++) {
                        var o = e[s >>> 2] >>> 24 - s % 4 * 8 & 255;
                        n.push(String.fromCharCode(o)) }
                    return n.join("") }, parse: function(t) {
                    for (var e = t.length, r = [], n = 0; e > n; n++) r[n >>> 2] |= (255 & t.charCodeAt(n)) << 24 - n % 4 * 8;
                    return new o.init(r, e) } },
            u = i.Utf8 = { stringify: function(t) {
                    try {
                        return decodeURIComponent(escape(a.stringify(t))) } catch (e) {
                        throw new Error("Malformed UTF-8 data") } }, parse: function(t) {
                    return a.parse(unescape(encodeURIComponent(t))) } },
            p = n.BufferedBlockAlgorithm = s.extend({ reset: function() { this._data = new o.init, this._nDataBytes = 0 }, _append: function(t) { "string" == typeof t && (t = u.parse(t)), this._data.concat(t), this._nDataBytes += t.sigBytes }, _process: function(e) {
                    var r = this._data,
                        n = r.words,
                        s = r.sigBytes,
                        i = this.blockSize,
                        l = 4 * i,
                        a = s / l;
                    a = e ? t.ceil(a) : t.max((0 | a) - this._minBufferSize, 0);
                    var u = a * i,
                        p = t.min(4 * u, s);
                    if (u) {
                        for (var c = 0; u > c; c += i) this._doProcessBlock(n, c);
                        var h = n.splice(0, u);
                        r.sigBytes -= p }
                    return new o.init(h, p) }, clone: function() {
                    var t = s.clone.call(this);
                    return t._data = this._data.clone(), t }, _minBufferSize: 0 }),
            c = (n.Hasher = p.extend({ cfg: s.extend(), init: function(t) { this.cfg = this.cfg.extend(t), this.reset() }, reset: function() { p.reset.call(this), this._doReset() }, update: function(t) {
                    return this._append(t), this._process(), this }, finalize: function(t) { t && this._append(t);
                    var e = this._doFinalize();
                    return e }, blockSize: 16, _createHelper: function(t) {
                    return function(e, r) {
                        return new t.init(r).finalize(e) } }, _createHmacHelper: function(t) {
                    return function(e, r) {
                        return new c.HMAC.init(t, r).finalize(e) } } }), r.algo = {});
        return r }(Math);
! function() {
    var t = CryptoJS,
        e = t.lib,
        r = e.WordArray,
        n = e.Hasher,
        s = t.algo,
        o = [],
        i = s.SHA1 = n.extend({
            _doReset: function() { this._hash = new r.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]) },
            _doProcessBlock: function(t, e) {
                for (var r = this._hash.words, n = r[0], s = r[1], i = r[2], l = r[3], a = r[4], u = 0; 80 > u; u++) {
                    if (16 > u) o[u] = 0 | t[e + u];
                    else {
                        var p = o[u - 3] ^ o[u - 8] ^ o[u - 14] ^ o[u - 16];
                        o[u] = p << 1 | p >>> 31 }
                    var c = (n << 5 | n >>> 27) + a + o[u];
                    c += 20 > u ? (s & i | ~s & l) + 1518500249 : 40 > u ? (s ^ i ^ l) + 1859775393 : 60 > u ? (s & i | s & l | i & l) - 1894007588 : (s ^ i ^ l) - 899497514, a = l, l = i, i = s << 30 | s >>> 2, s = n, n = c
                }
                r[0] = r[0] + n | 0, r[1] = r[1] + s | 0, r[2] = r[2] + i | 0, r[3] = r[3] + l | 0, r[4] = r[4] + a | 0
            },
            _doFinalize: function() {
                var t = this._data,
                    e = t.words,
                    r = 8 * this._nDataBytes,
                    n = 8 * t.sigBytes;
                return e[n >>> 5] |= 128 << 24 - n % 32, e[(n + 64 >>> 9 << 4) + 14] = Math.floor(r / 4294967296), e[(n + 64 >>> 9 << 4) + 15] = r, t.sigBytes = 4 * e.length, this._process(), this._hash },
            clone: function() {
                var t = n.clone.call(this);
                return t._hash = this._hash.clone(), t }
        });
    t.SHA1 = n._createHelper(i), t.HmacSHA1 = n._createHmacHelper(i)
}(), RSAKey.prototype.readPrivateKeyFromPEMString = _rsapem_readPrivateKeyFromPEMString, RSAKey.prototype.readPrivateKeyFromASN1HexString = _rsapem_readPrivateKeyFromASN1HexString;
var _RE_HEXDECONLY = new RegExp("");
_RE_HEXDECONLY.compile("[^0-9a-f]", "gi"), RSAKey.prototype.signWithMessageHash = _rsasign_signWithMessageHash, RSAKey.prototype.signString = _rsasign_signString, RSAKey.prototype.signStringWithSHA1 = _rsasign_signStringWithSHA1, RSAKey.prototype.signStringWithSHA256 = _rsasign_signStringWithSHA256, RSAKey.prototype.sign = _rsasign_signString, RSAKey.prototype.signWithSHA1 = _rsasign_signStringWithSHA1, RSAKey.prototype.signWithSHA256 = _rsasign_signStringWithSHA256, RSAKey.prototype.signWithMessageHashPSS = _rsasign_signWithMessageHashPSS, RSAKey.prototype.signStringPSS = _rsasign_signStringPSS, RSAKey.prototype.signPSS = _rsasign_signStringPSS, RSAKey.SALT_LEN_HLEN = -1, RSAKey.SALT_LEN_MAX = -2, RSAKey.prototype.verifyWithMessageHash = _rsasign_verifyWithMessageHash, RSAKey.prototype.verifyString = _rsasign_verifyString, RSAKey.prototype.verifyHexSignatureForMessage = _rsasign_verifyHexSignatureForMessage, RSAKey.prototype.verify = _rsasign_verifyString, RSAKey.prototype.verifyHexSignatureForByteArrayMessage = _rsasign_verifyHexSignatureForMessage, RSAKey.prototype.verifyWithMessageHashPSS = _rsasign_verifyWithMessageHashPSS, RSAKey.prototype.verifyStringPSS = _rsasign_verifyStringPSS, RSAKey.prototype.verifyPSS = _rsasign_verifyStringPSS, RSAKey.SALT_LEN_RECOVER = -2;
var ASN1HEX = new function() { this.getByteLengthOfL_AtObj = function(t, e) {
        if ("8" != t.substring(e + 2, e + 3)) return 1;
        var r = parseInt(t.substring(e + 3, e + 4));
        return 0 == r ? -1 : r > 0 && 10 > r ? r + 1 : -2 }, this.getHexOfL_AtObj = function(t, e) {
        var r = this.getByteLengthOfL_AtObj(t, e);
        return 1 > r ? "" : t.substring(e + 2, e + 2 + 2 * r) }, this.getIntOfL_AtObj = function(t, e) {
        var r = this.getHexOfL_AtObj(t, e);
        if ("" == r) return -1;
        var n;
        return n = parseInt(r.substring(0, 1)) < 8 ? new BigInteger(r, 16) : new BigInteger(r.substring(2), 16), n.intValue() }, this.getStartPosOfV_AtObj = function(t, e) {
        var r = this.getByteLengthOfL_AtObj(t, e);
        return 0 > r ? r : e + 2 * (r + 1) }, this.getHexOfV_AtObj = function(t, e) {
        var r = this.getStartPosOfV_AtObj(t, e),
            n = this.getIntOfL_AtObj(t, e);
        return t.substring(r, r + 2 * n) }, this.getHexOfTLV_AtObj = function(t, e) {
        var r = t.substr(e, 2),
            n = this.getHexOfL_AtObj(t, e),
            s = this.getHexOfV_AtObj(t, e);
        return r + n + s }, this.getPosOfNextSibling_AtObj = function(t, e) {
        var r = this.getStartPosOfV_AtObj(t, e),
            n = this.getIntOfL_AtObj(t, e);
        return r + 2 * n }, this.getPosArrayOfChildren_AtObj = function(t, e) {
        var r = new Array,
            n = this.getStartPosOfV_AtObj(t, e);
        r.push(n);
        for (var s = this.getIntOfL_AtObj(t, e), o = n, i = 0;;) {
            var l = this.getPosOfNextSibling_AtObj(t, o);
            if (null == l || l - n >= 2 * s) break;
            if (i >= 200) break;
            r.push(l), o = l, i++ }
        return r }, this.getNthChildIndex_AtObj = function(t, e, r) {
        var n = this.getPosArrayOfChildren_AtObj(t, e);
        return n[r] }, this.getDecendantIndexByNthList = function(t, e, r) {
        if (0 == r.length) return e;
        var n = r.shift(),
            s = this.getPosArrayOfChildren_AtObj(t, e);
        return this.getDecendantIndexByNthList(t, s[n], r) }, this.getDecendantHexTLVByNthList = function(t, e, r) {
        var n = this.getDecendantIndexByNthList(t, e, r);
        return this.getHexOfTLV_AtObj(t, n) }, this.getDecendantHexVByNthList = function(t, e, r) {
        var n = this.getDecendantIndexByNthList(t, e, r);
        return this.getHexOfV_AtObj(t, n) } };
ASN1HEX.getVbyList = function(t, e, r, n) {
    var s = this.getDecendantIndexByNthList(t, e, r);
    if (void 0 === s) throw "can't find nthList object";
    if (void 0 !== n && t.substr(s, 2) != n) throw "checking tag doesn't match: " + t.substr(s, 2) + "!=" + n;
    return this.getHexOfV_AtObj(t, s) }, X509.pemToBase64 = function(t) {
    var e = t;
    return e = e.replace("-----BEGIN CERTIFICATE-----", ""), e = e.replace("-----END CERTIFICATE-----", ""), e = e.replace(/[ \n]+/g, "") }, X509.pemToHex = function(t) {
    var e = X509.pemToBase64(t),
        r = b64tohex(e);
    return r }, X509.getSubjectPublicKeyPosFromCertHex = function(t) {
    var e = X509.getSubjectPublicKeyInfoPosFromCertHex(t);
    if (-1 == e) return -1;
    var r = ASN1HEX.getPosArrayOfChildren_AtObj(t, e);
    if (2 != r.length) return -1;
    var n = r[1];
    if ("03" != t.substring(n, n + 2)) return -1;
    var s = ASN1HEX.getStartPosOfV_AtObj(t, n);
    return "00" != t.substring(s, s + 2) ? -1 : s + 2 }, X509.getSubjectPublicKeyInfoPosFromCertHex = function(t) {
    var e = ASN1HEX.getStartPosOfV_AtObj(t, 0),
        r = ASN1HEX.getPosArrayOfChildren_AtObj(t, e);
    return r.length < 1 ? -1 : "a003020102" == t.substring(r[0], r[0] + 10) ? r.length < 6 ? -1 : r[6] : r.length < 5 ? -1 : r[5] }, X509.getPublicKeyHexArrayFromCertHex = function(t) {
    var e = X509.getSubjectPublicKeyPosFromCertHex(t),
        r = ASN1HEX.getPosArrayOfChildren_AtObj(t, e);
    if (2 != r.length) return [];
    var n = ASN1HEX.getHexOfV_AtObj(t, r[0]),
        s = ASN1HEX.getHexOfV_AtObj(t, r[1]);
    return null != n && null != s ? [n, s] : [] }, X509.getHexTbsCertificateFromCert = function(t) {
    var e = ASN1HEX.getStartPosOfV_AtObj(t, 0);
    return e }, X509.getPublicKeyHexArrayFromCertPEM = function(t) {
    var e = X509.pemToHex(t),
        r = X509.getPublicKeyHexArrayFromCertHex(e);
    return r }, X509.hex2dn = function(t) {
    for (var e = "", r = ASN1HEX.getPosArrayOfChildren_AtObj(t, 0), n = 0; n < r.length; n++) {
        var s = ASN1HEX.getHexOfTLV_AtObj(t, r[n]);
        e = e + "/" + X509.hex2rdn(s) }
    return e }, X509.hex2rdn = function(t) {
    var e = ASN1HEX.getDecendantHexTLVByNthList(t, 0, [0, 0]),
        r = ASN1HEX.getDecendantHexVByNthList(t, 0, [0, 1]),
        n = "";
    try { n = X509.DN_ATTRHEX[e] } catch (s) { n = e }
    r = r.replace(/(..)/g, "%$1");
    var o = decodeURIComponent(r);
    return n + "=" + o }, X509.DN_ATTRHEX = { "0603550406": "C", "060355040a": "O", "060355040b": "OU", "0603550403": "CN", "0603550405": "SN", "0603550408": "ST", "0603550407": "L" }, X509.getPublicKeyFromCertPEM = function(t) {
    var e = X509.getPublicKeyInfoPropOfCertPEM(t);
    if ("2a864886f70d010101" == e.algoid) {
        var r = KEYUTIL.parsePublicRawRSAKeyHex(e.keyhex),
            n = new RSAKey;
        return n.setPublic(r.n, r.e), n }
    if ("2a8648ce3d0201" == e.algoid) {
        var s = KJUR.crypto.OID.oidhex2name[e.algparam],
            n = new KJUR.crypto.ECDSA({ curve: s, info: e.keyhex });
        return n.setPublicKeyHex(e.keyhex), n }
    if ("2a8648ce380401" == e.algoid) {
        var o = ASN1HEX.getVbyList(e.algparam, 0, [0], "02"),
            i = ASN1HEX.getVbyList(e.algparam, 0, [1], "02"),
            l = ASN1HEX.getVbyList(e.algparam, 0, [2], "02"),
            a = ASN1HEX.getHexOfV_AtObj(e.keyhex, 0);
        a = a.substr(2);
        var n = new KJUR.crypto.DSA;
        return n.setPublic(new BigInteger(o, 16), new BigInteger(i, 16), new BigInteger(l, 16), new BigInteger(a, 16)), n }
    throw "unsupported key" }, X509.getPublicKeyInfoPropOfCertPEM = function(t) {
    var e = {};
    e.algparam = null;
    var r = X509.pemToHex(t),
        n = ASN1HEX.getPosArrayOfChildren_AtObj(r, 0);
    if (3 != n.length) throw "malformed X.509 certificate PEM (code:001)";
    if ("30" != r.substr(n[0], 2)) throw "malformed X.509 certificate PEM (code:002)";
    var s = ASN1HEX.getPosArrayOfChildren_AtObj(r, n[0]);
    if (s.length < 7) throw "malformed X.509 certificate PEM (code:003)";
    var o = ASN1HEX.getPosArrayOfChildren_AtObj(r, s[6]);
    if (2 != o.length) throw "malformed X.509 certificate PEM (code:004)";
    var i = ASN1HEX.getPosArrayOfChildren_AtObj(r, o[0]);
    if (2 != i.length) throw "malformed X.509 certificate PEM (code:005)";
    if (e.algoid = ASN1HEX.getHexOfV_AtObj(r, i[0]), "06" == r.substr(i[1], 2) ? e.algparam = ASN1HEX.getHexOfV_AtObj(r, i[1]) : "30" == r.substr(i[1], 2) && (e.algparam = ASN1HEX.getHexOfTLV_AtObj(r, i[1])), "03" != r.substr(o[1], 2)) throw "malformed X.509 certificate PEM (code:006)";
    var l = ASN1HEX.getHexOfV_AtObj(r, o[1]);
    return e.keyhex = l.substr(2), e }, "undefined" != typeof KJUR && KJUR || (KJUR = {}), "undefined" != typeof KJUR.crypto && KJUR.crypto || (KJUR.crypto = {}), KJUR.crypto.Util = new function() { this.DIGESTINFOHEAD = { sha1: "3021300906052b0e03021a05000414", sha224: "302d300d06096086480165030402040500041c", sha256: "3031300d060960864801650304020105000420", sha384: "3041300d060960864801650304020205000430", sha512: "3051300d060960864801650304020305000440", md2: "3020300c06082a864886f70d020205000410", md5: "3020300c06082a864886f70d020505000410", ripemd160: "3021300906052b2403020105000414" }, this.DEFAULTPROVIDER = { md5: "cryptojs", sha1: "cryptojs", sha224: "cryptojs", sha256: "cryptojs", sha384: "cryptojs", sha512: "cryptojs", ripemd160: "cryptojs", hmacmd5: "cryptojs", hmacsha1: "cryptojs", hmacsha224: "cryptojs", hmacsha256: "cryptojs", hmacsha384: "cryptojs", hmacsha512: "cryptojs", hmacripemd160: "cryptojs", MD5withRSA: "cryptojs/jsrsa", SHA1withRSA: "cryptojs/jsrsa", SHA224withRSA: "cryptojs/jsrsa", SHA256withRSA: "cryptojs/jsrsa", SHA384withRSA: "cryptojs/jsrsa", SHA512withRSA: "cryptojs/jsrsa", RIPEMD160withRSA: "cryptojs/jsrsa", MD5withECDSA: "cryptojs/jsrsa", SHA1withECDSA: "cryptojs/jsrsa", SHA224withECDSA: "cryptojs/jsrsa", SHA256withECDSA: "cryptojs/jsrsa", SHA384withECDSA: "cryptojs/jsrsa", SHA512withECDSA: "cryptojs/jsrsa", RIPEMD160withECDSA: "cryptojs/jsrsa", SHA1withDSA: "cryptojs/jsrsa", SHA224withDSA: "cryptojs/jsrsa", SHA256withDSA: "cryptojs/jsrsa", MD5withRSAandMGF1: "cryptojs/jsrsa", SHA1withRSAandMGF1: "cryptojs/jsrsa", SHA224withRSAandMGF1: "cryptojs/jsrsa", SHA256withRSAandMGF1: "cryptojs/jsrsa", SHA384withRSAandMGF1: "cryptojs/jsrsa", SHA512withRSAandMGF1: "cryptojs/jsrsa", RIPEMD160withRSAandMGF1: "cryptojs/jsrsa" }, this.CRYPTOJSMESSAGEDIGESTNAME = { md5: "CryptoJS.algo.MD5", sha1: "CryptoJS.algo.SHA1", sha224: "CryptoJS.algo.SHA224", sha256: "CryptoJS.algo.SHA256", sha384: "CryptoJS.algo.SHA384", sha512: "CryptoJS.algo.SHA512", ripemd160: "CryptoJS.algo.RIPEMD160" }, this.getDigestInfoHex = function(t, e) {
        if ("undefined" == typeof this.DIGESTINFOHEAD[e]) throw "alg not supported in Util.DIGESTINFOHEAD: " + e;
        return this.DIGESTINFOHEAD[e] + t }, this.getPaddedDigestInfoHex = function(t, e, r) {
        var n = this.getDigestInfoHex(t, e),
            s = r / 4;
        if (n.length + 22 > s) throw "key is too short for SigAlg: keylen=" + r + "," + e;
        for (var o = "0001", i = "00" + n, l = "", a = s - o.length - i.length, u = 0; a > u; u += 2) l += "ff";
        var p = o + l + i;
        return p }, this.hashString = function(t, e) {
        var r = new KJUR.crypto.MessageDigest({ alg: e });
        return r.digestString(t) }, this.hashHex = function(t, e) {
        var r = new KJUR.crypto.MessageDigest({ alg: e });
        return r.digestHex(t) }, this.sha1 = function(t) {
        var e = new KJUR.crypto.MessageDigest({ alg: "sha1", prov: "cryptojs" });
        return e.digestString(t) }, this.sha256 = function(t) {
        var e = new KJUR.crypto.MessageDigest({ alg: "sha256", prov: "cryptojs" });
        return e.digestString(t) }, this.sha256Hex = function(t) {
        var e = new KJUR.crypto.MessageDigest({ alg: "sha256", prov: "cryptojs" });
        return e.digestHex(t) }, this.sha512 = function(t) {
        var e = new KJUR.crypto.MessageDigest({ alg: "sha512", prov: "cryptojs" });
        return e.digestString(t) }, this.sha512Hex = function(t) {
        var e = new KJUR.crypto.MessageDigest({ alg: "sha512", prov: "cryptojs" });
        return e.digestHex(t) }, this.md5 = function(t) {
        var e = new KJUR.crypto.MessageDigest({ alg: "md5", prov: "cryptojs" });
        return e.digestString(t) }, this.ripemd160 = function(t) {
        var e = new KJUR.crypto.MessageDigest({ alg: "ripemd160", prov: "cryptojs" });
        return e.digestString(t) }, this.getCryptoJSMDByName = function() {} }, KJUR.crypto.MessageDigest = function(params) {
    var md = null,
        algName = null,
        provName = null;
    this.setAlgAndProvider = function(alg, prov) {
        if (null != alg && void 0 === prov && (prov = KJUR.crypto.Util.DEFAULTPROVIDER[alg]), -1 != ":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(alg) && "cryptojs" == prov) {
            try { this.md = eval(KJUR.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[alg]).create() } catch (ex) {
                throw "setAlgAndProvider hash alg set fail alg=" + alg + "/" + ex }
            this.updateString = function(t) { this.md.update(t) }, this.updateHex = function(t) {
                var e = CryptoJS.enc.Hex.parse(t);
                this.md.update(e) }, this.digest = function() {
                var t = this.md.finalize();
                return t.toString(CryptoJS.enc.Hex) }, this.digestString = function(t) {
                return this.updateString(t), this.digest() }, this.digestHex = function(t) {
                return this.updateHex(t), this.digest() } }
        if (-1 != ":sha256:".indexOf(alg) && "sjcl" == prov) {
            try { this.md = new sjcl.hash.sha256 } catch (ex) {
                throw "setAlgAndProvider hash alg set fail alg=" + alg + "/" + ex }
            this.updateString = function(t) { this.md.update(t) }, this.updateHex = function(t) {
                var e = sjcl.codec.hex.toBits(t);
                this.md.update(e) }, this.digest = function() {
                var t = this.md.finalize();
                return sjcl.codec.hex.fromBits(t) }, this.digestString = function(t) {
                return this.updateString(t), this.digest() }, this.digestHex = function(t) {
                return this.updateHex(t), this.digest() } } }, this.updateString = function() {
        throw "updateString(str) not supported for this alg/prov: " + this.algName + "/" + this.provName }, this.updateHex = function() {
        throw "updateHex(hex) not supported for this alg/prov: " + this.algName + "/" + this.provName }, this.digest = function() {
        throw "digest() not supported for this alg/prov: " + this.algName + "/" + this.provName }, this.digestString = function() {
        throw "digestString(str) not supported for this alg/prov: " + this.algName + "/" + this.provName }, this.digestHex = function() {
        throw "digestHex(hex) not supported for this alg/prov: " + this.algName + "/" + this.provName }, void 0 !== params && void 0 !== params.alg && (this.algName = params.alg, void 0 === params.prov && (this.provName = KJUR.crypto.Util.DEFAULTPROVIDER[this.algName]), this.setAlgAndProvider(this.algName, this.provName)) }, KJUR.crypto.Mac = function(params) {
    var mac = null,
        pass = null,
        algName = null,
        provName = null,
        algProv = null;
    this.setAlgAndProvider = function(alg, prov) {
        if (null == alg && (alg = "hmacsha1"), alg = alg.toLowerCase(), "hmac" != alg.substr(0, 4)) throw "setAlgAndProvider unsupported HMAC alg: " + alg;
        void 0 === prov && (prov = KJUR.crypto.Util.DEFAULTPROVIDER[alg]), this.algProv = alg + "/" + prov;
        var hashAlg = alg.substr(4);
        if (-1 != ":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(hashAlg) && "cryptojs" == prov) {
            try {
                var mdObj = eval(KJUR.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[hashAlg]);
                this.mac = CryptoJS.algo.HMAC.create(mdObj, this.pass) } catch (ex) {
                throw "setAlgAndProvider hash alg set fail hashAlg=" + hashAlg + "/" + ex }
            this.updateString = function(t) { this.mac.update(t) }, this.updateHex = function(t) {
                var e = CryptoJS.enc.Hex.parse(t);
                this.mac.update(e) }, this.doFinal = function() {
                var t = this.mac.finalize();
                return t.toString(CryptoJS.enc.Hex) }, this.doFinalString = function(t) {
                return this.updateString(t), this.doFinal() }, this.doFinalHex = function(t) {
                return this.updateHex(t), this.doFinal() } } }, this.updateString = function() {
        throw "updateString(str) not supported for this alg/prov: " + this.algProv }, this.updateHex = function() {
        throw "updateHex(hex) not supported for this alg/prov: " + this.algProv }, this.doFinal = function() {
        throw "digest() not supported for this alg/prov: " + this.algProv }, this.doFinalString = function() {
        throw "digestString(str) not supported for this alg/prov: " + this.algProv }, this.doFinalHex = function() {
        throw "digestHex(hex) not supported for this alg/prov: " + this.algProv }, void 0 !== params && (void 0 !== params.pass && (this.pass = params.pass), void 0 !== params.alg && (this.algName = params.alg, void 0 === params.prov && (this.provName = KJUR.crypto.Util.DEFAULTPROVIDER[this.algName]), this.setAlgAndProvider(this.algName, this.provName))) }, KJUR.crypto.Signature = function(t) {
    var e = null;
    if (this._setAlgNames = function() { this.algName.match(/^(.+)with(.+)$/) && (this.mdAlgName = RegExp.$1.toLowerCase(), this.pubkeyAlgName = RegExp.$2.toLowerCase()) }, this._zeroPaddingOfSignature = function(t, e) {
            for (var r = "", n = e / 4 - t.length, s = 0; n > s; s++) r += "0";
            return r + t }, this.setAlgAndProvider = function(t, e) {
            if (this._setAlgNames(), "cryptojs/jsrsa" != e) throw "provider not supported: " + e;
            if (-1 != ":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(this.mdAlgName)) {
                try { this.md = new KJUR.crypto.MessageDigest({ alg: this.mdAlgName }) } catch (r) {
                    throw "setAlgAndProvider hash alg set fail alg=" + this.mdAlgName + "/" + r }
                this.init = function(t, e) {
                    var r = null;
                    try { r = void 0 === e ? KEYUTIL.getKey(t) : KEYUTIL.getKey(t, e) } catch (n) {
                        throw "init failed:" + n }
                    if (r.isPrivate === !0) this.prvKey = r, this.state = "SIGN";
                    else {
                        if (r.isPublic !== !0) throw "init failed.:" + r;
                        this.pubKey = r, this.state = "VERIFY" } }, this.initSign = function(t) { "string" == typeof t.ecprvhex && "string" == typeof t.eccurvename ? (this.ecprvhex = t.ecprvhex, this.eccurvename = t.eccurvename) : this.prvKey = t, this.state = "SIGN" }, this.initVerifyByPublicKey = function(t) { "string" == typeof t.ecpubhex && "string" == typeof t.eccurvename ? (this.ecpubhex = t.ecpubhex, this.eccurvename = t.eccurvename) : t instanceof KJUR.crypto.ECDSA ? this.pubKey = t : t instanceof RSAKey && (this.pubKey = t), this.state = "VERIFY" }, this.initVerifyByCertificatePEM = function(t) {
                    var e = new X509;
                    e.readCertPEM(t), this.pubKey = e.subjectPublicKeyRSA, this.state = "VERIFY" }, this.updateString = function(t) { this.md.updateString(t) }, this.updateHex = function(t) { this.md.updateHex(t) }, this.sign = function() {
                    if (this.sHashHex = this.md.digest(), "undefined" != typeof this.ecprvhex && "undefined" != typeof this.eccurvename) {
                        var t = new KJUR.crypto.ECDSA({ curve: this.eccurvename });
                        this.hSign = t.signHex(this.sHashHex, this.ecprvhex) } else if ("rsaandmgf1" == this.pubkeyAlgName) this.hSign = this.prvKey.signWithMessageHashPSS(this.sHashHex, this.mdAlgName, this.pssSaltLen);
                    else if ("rsa" == this.pubkeyAlgName) this.hSign = this.prvKey.signWithMessageHash(this.sHashHex, this.mdAlgName);
                    else if (this.prvKey instanceof KJUR.crypto.ECDSA) this.hSign = this.prvKey.signWithMessageHash(this.sHashHex);
                    else {
                        if (!(this.prvKey instanceof KJUR.crypto.DSA)) throw "Signature: unsupported public key alg: " + this.pubkeyAlgName;
                        this.hSign = this.prvKey.signWithMessageHash(this.sHashHex) }
                    return this.hSign }, this.signString = function(t) { this.updateString(t), this.sign() }, this.signHex = function(t) { this.updateHex(t), this.sign() }, this.verify = function(t) {
                    if (this.sHashHex = this.md.digest(), "undefined" != typeof this.ecpubhex && "undefined" != typeof this.eccurvename) {
                        var e = new KJUR.crypto.ECDSA({ curve: this.eccurvename });
                        return e.verifyHex(this.sHashHex, t, this.ecpubhex) }
                    if ("rsaandmgf1" == this.pubkeyAlgName) return this.pubKey.verifyWithMessageHashPSS(this.sHashHex, t, this.mdAlgName, this.pssSaltLen);
                    if ("rsa" == this.pubkeyAlgName) return this.pubKey.verifyWithMessageHash(this.sHashHex, t);
                    if (this.pubKey instanceof KJUR.crypto.ECDSA) return this.pubKey.verifyWithMessageHash(this.sHashHex, t);
                    if (this.pubKey instanceof KJUR.crypto.DSA) return this.pubKey.verifyWithMessageHash(this.sHashHex, t);
                    throw "Signature: unsupported public key alg: " + this.pubkeyAlgName } } }, this.init = function() {
            throw "init(key, pass) not supported for this alg:prov=" + this.algProvName }, this.initVerifyByPublicKey = function() {
            throw "initVerifyByPublicKey(rsaPubKeyy) not supported for this alg:prov=" + this.algProvName }, this.initVerifyByCertificatePEM = function() {
            throw "initVerifyByCertificatePEM(certPEM) not supported for this alg:prov=" + this.algProvName }, this.initSign = function() {
            throw "initSign(prvKey) not supported for this alg:prov=" + this.algProvName }, this.updateString = function() {
            throw "updateString(str) not supported for this alg:prov=" + this.algProvName }, this.updateHex = function() {
            throw "updateHex(hex) not supported for this alg:prov=" + this.algProvName }, this.sign = function() {
            throw "sign() not supported for this alg:prov=" + this.algProvName }, this.signString = function() {
            throw "digestString(str) not supported for this alg:prov=" + this.algProvName }, this.signHex = function() {
            throw "digestHex(hex) not supported for this alg:prov=" + this.algProvName }, this.verify = function() {
            throw "verify(hSigVal) not supported for this alg:prov=" + this.algProvName }, this.initParams = t, void 0 !== t && (void 0 !== t.alg && (this.algName = t.alg, this.provName = void 0 === t.prov ? KJUR.crypto.Util.DEFAULTPROVIDER[this.algName] : t.prov, this.algProvName = this.algName + ":" + this.provName, this.setAlgAndProvider(this.algName, this.provName), this._setAlgNames()), void 0 !== t.psssaltlen && (this.pssSaltLen = t.psssaltlen), void 0 !== t.prvkeypem)) {
        if (void 0 !== t.prvkeypas) throw "both prvkeypem and prvkeypas parameters not supported";
        try {
            var e = new RSAKey;
            e.readPrivateKeyFromPEMString(t.prvkeypem), this.initSign(e) } catch (r) {
            throw "fatal error to load pem private key: " + r } } }, KJUR.crypto.OID = new function() { this.oidhex2name = { "2a864886f70d010101": "rsaEncryption", "2a8648ce3d0201": "ecPublicKey", "2a8648ce380401": "dsa", "2a8648ce3d030107": "secp256r1", "2b8104001f": "secp192k1", "2b81040021": "secp224r1", "2b8104000a": "secp256k1", "2b81040023": "secp521r1", "2b81040022": "secp384r1", "2a8648ce380403": "SHA1withDSA", "608648016503040301": "SHA224withDSA", "608648016503040302": "SHA256withDSA" } };
var d20 = d20 || {};
d20.DicePEG = function() {
        function quote(t) {
            return '"' + t.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g, escape) + '"' }
        var result = {
            parse: function(input, startRule) {
                function padLeft(t, e, r) {
                    for (var n = t, s = r - t.length, o = 0; s > o; o++) n = e + n;
                    return n }

                function escape(t) {
                    var e, r, n = t.charCodeAt(0);
                    return 255 >= n ? (e = "x", r = 2) : (e = "u", r = 4), "\\" + e + padLeft(n.toString(16).toUpperCase(), "0", r) }

                function matchFailed(t) { rightmostFailuresPos > pos || (pos > rightmostFailuresPos && (rightmostFailuresPos = pos, rightmostFailuresExpected = []), rightmostFailuresExpected.push(t)) }

                function parse_start() {
                    var t, e, r, n, s;
                    if (n = pos, s = pos, t = parse_rollExpression(), null !== t) {
                        for (e = [], input.length > pos ? (r = input.charAt(pos), pos++) : (r = null, 0 === reportFailures && matchFailed("any character")); null !== r;) e.push(r), input.length > pos ? (r = input.charAt(pos), pos++) : (r = null, 0 === reportFailures && matchFailed("any character"));
                        null !== e ? t = [t, e] : (t = null, pos = s) } else t = null, pos = s;
                    return null !== t && (t = function(t, e, r) {
                        return Array.isArray(e) || (e = [e]), "" !== r && (r = r.join(""), r.trim().length > 0 && e.push(new Comment(r))), e }(n, t[0], t[1])), null === t && (pos = n), t }

                function parse_rollExpression() {
                    var t, e, r, n, s;
                    return n = pos, s = pos, t = parse_rollExpressionPrimary(), null !== t ? (e = parse_labelAwareRollOperator(), null !== e ? (r = parse_rollExpression(), null !== r ? t = [t, e, r] : (t = null, pos = s)) : (t = null, pos = s)) : (t = null, pos = s), null !== t && (t = function(t, e, r, n) {
                        var s = e;
                        return s = mergeExpressions(s, r), s = mergeExpressions(s, n) }(n, t[0], t[1], t[2])), null === t && (pos = n), null === t && (n = pos, s = pos, t = parse_rollExpressionPrimary(), null !== t ? (e = parse_inlineLabelWithSpace(), null !== e ? t = [t, e] : (t = null, pos = s)) : (t = null, pos = s), null !== t && (t = function(t, e, r) {
                        return mergeExpressions(e, r) }(n, t[0], t[1])), null === t && (pos = n), null === t && (n = pos, s = pos, t = parse_inlineLabelWithSpace(), null !== t ? (e = parse_rollExpression(), null !== e ? t = [t, e] : (t = null, pos = s)) : (t = null, pos = s), null !== t && (t = function(t, e, r) {
                        return mergeExpressions(e, r) }(n, t[0], t[1])), null === t && (pos = n), null === t && (n = pos, t = parse_rollExpressionPrimary(), null !== t && (t = function(t, e) {
                        return Array.isArray(e) || (e = [e]), e }(n, t)), null === t && (pos = n)))), t }

                function parse_rollExpressionPrimary() {
                    var t, e, r, n, s, o, i, l;
                    return o = pos, i = pos, t = parse_fullRoll(), null !== t ? (l = pos, reportFailures++, e = parse_validRollSuffix(), reportFailures--, null !== e ? (e = "", pos = l) : e = null, null !== e ? t = [t, e] : (t = null, pos = i)) : (t = null, pos = i), null !== t && (t = function(t, e) {
                        return e }(o, t[0])), null === t && (pos = o), null === t && (o = pos, i = pos, t = parse_rollGroup(), null !== t ? (l = pos, reportFailures++, e = parse_validRollSuffix(), reportFailures--, null !== e ? (e = "", pos = l) : e = null, null !== e ? t = [t, e] : (t = null, pos = i)) : (t = null, pos = i), null !== t && (t = function(t, e) {
                        return e }(o, t[0])), null === t && (pos = o), null === t && (o = pos, t = parse_number(), null !== t && (t = function(t, e) {
                        return new MathExpression(e) }(o, t)), null === t && (pos = o), null === t && (o = pos, i = pos, "floor(" === input.substr(pos, 6) ? (t = "floor(", pos += 6) : (t = null, 0 === reportFailures && matchFailed('"floor("')), null !== t ? (e = parse__(), null !== e ? (r = parse_rollExpression(), null !== r ? (n = parse__(), null !== n ? (41 === input.charCodeAt(pos) ? (s = ")", pos++) : (s = null, 0 === reportFailures && matchFailed('")"')), null !== s ? t = [t, e, r, n, s] : (t = null, pos = i)) : (t = null, pos = i)) : (t = null, pos = i)) : (t = null, pos = i)) : (t = null, pos = i), null !== t && (t = function(t, e) {
                        return mergeExpressions("floor(", mergeExpressions(e, ")")) }(o, t[2])), null === t && (pos = o), null === t && (o = pos, i = pos, "ceil(" === input.substr(pos, 5) ? (t = "ceil(", pos += 5) : (t = null, 0 === reportFailures && matchFailed('"ceil("')), null !== t ? (e = parse__(), null !== e ? (r = parse_rollExpression(), null !== r ? (n = parse__(), null !== n ? (41 === input.charCodeAt(pos) ? (s = ")", pos++) : (s = null, 0 === reportFailures && matchFailed('")"')), null !== s ? t = [t, e, r, n, s] : (t = null, pos = i)) : (t = null, pos = i)) : (t = null, pos = i)) : (t = null, pos = i)) : (t = null, pos = i), null !== t && (t = function(t, e) {
                        return mergeExpressions("ceil(", mergeExpressions(e, ")")) }(o, t[2])), null === t && (pos = o), null === t && (o = pos, i = pos, "round(" === input.substr(pos, 6) ? (t = "round(", pos += 6) : (t = null, 0 === reportFailures && matchFailed('"round("')), null !== t ? (e = parse__(), null !== e ? (r = parse_rollExpression(), null !== r ? (n = parse__(), null !== n ? (41 === input.charCodeAt(pos) ? (s = ")", pos++) : (s = null, 0 === reportFailures && matchFailed('")"')), null !== s ? t = [t, e, r, n, s] : (t = null, pos = i)) : (t = null, pos = i)) : (t = null, pos = i)) : (t = null, pos = i)) : (t = null, pos = i), null !== t && (t = function(t, e) {
                        return mergeExpressions("round(", mergeExpressions(e, ")")) }(o, t[2])), null === t && (pos = o), null === t && (o = pos, i = pos, "abs(" === input.substr(pos, 4) ? (t = "abs(", pos += 4) : (t = null, 0 === reportFailures && matchFailed('"abs("')), null !== t ? (e = parse__(), null !== e ? (r = parse_rollExpression(), null !== r ? (n = parse__(), null !== n ? (41 === input.charCodeAt(pos) ? (s = ")", pos++) : (s = null, 0 === reportFailures && matchFailed('")"')), null !== s ? t = [t, e, r, n, s] : (t = null, pos = i)) : (t = null, pos = i)) : (t = null, pos = i)) : (t = null, pos = i)) : (t = null, pos = i), null !== t && (t = function(t, e) {
                        return mergeExpressions("abs(", mergeExpressions(e, ")")) }(o, t[2])), null === t && (pos = o), null === t && (o = pos, i = pos, 40 === input.charCodeAt(pos) ? (t = "(", pos++) : (t = null, 0 === reportFailures && matchFailed('"("')), null !== t ? (e = parse__(), null !== e ? (r = parse_rollExpression(), null !== r ? (n = parse__(), null !== n ? (41 === input.charCodeAt(pos) ? (s = ")", pos++) : (s = null, 0 === reportFailures && matchFailed('")"')), null !== s ? t = [t, e, r, n, s] : (t = null, pos = i)) : (t = null, pos = i)) : (t = null, pos = i)) : (t = null, pos = i)) : (t = null, pos = i), null !== t && (t = function(t, e) {
                        return mergeExpressions("(", mergeExpressions(e, ")")) }(o, t[2])), null === t && (pos = o)))))))), t }

                function parse_validRollSuffix() {
                    var t, e;
                    return t = parse___(), null === t && (t = parse_inlineLabelWithSpace(), null === t && (125 === input.charCodeAt(pos) ? (t = "}", pos++) : (t = null, 0 === reportFailures && matchFailed('"}"')), null === t && (44 === input.charCodeAt(pos) ? (t = ",", pos++) : (t = null, 0 === reportFailures && matchFailed('","')), null === t && (41 === input.charCodeAt(pos) ? (t = ")", pos++) : (t = null, 0 === reportFailures && matchFailed('")"')), null === t && (e = pos, reportFailures++, t = parse_operator(), reportFailures--, null !== t ? (t = "", pos = e) : t = null, null === t && (e = pos, reportFailures++, input.length > pos ? (t = input.charAt(pos), pos++) : (t = null, 0 === reportFailures && matchFailed("any character")), reportFailures--, null === t ? t = "" : (t = null, pos = e))))))), t }

                function parse_rollGroup() {
                    var t, e, r, n, s, o, i, l;
                    return i = pos, l = pos, 123 === input.charCodeAt(pos) ? (t = "{", pos++) : (t = null, 0 === reportFailures && matchFailed('"{"')), null !== t ? (e = parse__(), null !== e ? (r = parse_rollGroupExpression(), null !== r ? (n = parse__(), null !== n ? (125 === input.charCodeAt(pos) ? (s = "}", pos++) : (s = null, 0 === reportFailures && matchFailed('"}"')), null !== s ? (o = parse_groupMods(), o = null !== o ? o : "", null !== o ? t = [t, e, r, n, s, o] : (t = null, pos = l)) : (t = null, pos = l)) : (t = null, pos = l)) : (t = null, pos = l)) : (t = null, pos = l)) : (t = null, pos = l), null !== t && (t = function(t, e, r) {
                        return new GroupExpression(e, r) }(i, t[2], t[5])), null === t && (pos = i), t }

                function parse_rollGroupExpression() {
                    var t, e, r, n, s, o, i;
                    return o = pos, i = pos, t = parse_rollExpression(), null === t && (t = parse_rollGroup()), null !== t ? (e = parse__(), null !== e ? (44 === input.charCodeAt(pos) ? (r = ",", pos++) : (r = null, 0 === reportFailures && matchFailed('","')), null !== r ? (n = parse__(), null !== n ? (s = parse_rollGroupExpression(), null !== s ? t = [t, e, r, n, s] : (t = null, pos = i)) : (t = null, pos = i)) : (t = null, pos = i)) : (t = null, pos = i)) : (t = null, pos = i), null !== t && (t = function(t, e, r) {
                        return Array.isArray(e) || (e = [e]), "" !== r ? [e].concat(r) : e }(o, t[0], t[4])), null === t && (pos = o), null === t && (o = pos, t = parse_rollExpression(), null === t && (t = parse_rollGroup()), null !== t && (t = function(t, e) {
                        return [e] }(o, t)), null === t && (pos = o)), t }

                function parse_labelAwareRollOperator() {
                    var t, e, r, n, s;
                    if (n = pos, s = pos, t = parse_rollOperator(), null !== t) {
                        for (e = [], r = parse_rollOperator(), null === r && (r = parse_inlineLabelWithSpace()); null !== r;) e.push(r), r = parse_rollOperator(), null === r && (r = parse_inlineLabelWithSpace());
                        null !== e ? t = [t, e] : (t = null, pos = s) } else t = null, pos = s;
                    return null !== t && (t = function(t, e, r) {
                        for (var n = e, s = 0; s < r.length; s++) n = mergeExpressions(n, r[s]);
                        return n }(n, t[0], t[1])), null === t && (pos = n), null === t && (n = pos, s = pos, t = parse_inlineLabelWithSpace(), null !== t ? (e = parse_labelAwareRollOperator(), null !== e ? t = [t, e] : (t = null, pos = s)) : (t = null, pos = s), null !== t && (t = function(t, e, r) {
                        return mergeExpressions(e, r) }(n, t[0], t[1])), null === t && (pos = n)), t }

                function parse_rollOperator() {
                    var t, e, r, n, s, o, i, l, a;
                    return l = pos, a = pos, t = parse__(), null !== t ? (e = parse_operator(), null !== e ? (r = parse__(), null !== r ? (n = parse_mathExpressionPrimary(), null !== n ? (s = parse__(), null !== s ? (o = parse_rollOperator(), null !== o ? (i = parse__(), null !== i ? t = [t, e, r, n, s, o, i] : (t = null, pos = a)) : (t = null, pos = a)) : (t = null, pos = a)) : (t = null, pos = a)) : (t = null, pos = a)) : (t = null, pos = a)) : (t = null, pos = a), null !== t && (t = function(t, e, r, n) {
                        return e + r + n }(l, t[1], t[3], t[5])), null === t && (pos = l), null === t && (l = pos, a = pos, t = parse__(), null !== t ? (e = parse_operator(), null !== e ? (r = parse__(), null !== r ? t = [t, e, r] : (t = null, pos = a)) : (t = null, pos = a)) : (t = null, pos = a), null !== t && (t = function(t, e) {
                        return e }(l, t[1])), null === t && (pos = l)), t }

                function parse_fullRoll() {
                    var t, e, r, n, s;
                    return n = pos, s = pos, t = parse_coreRoll(), null !== t ? (e = parse_rollMods(), e = null !== e ? e : "", null !== e ? t = [t, e] : (t = null, pos = s)) : (t = null, pos = s), null !== t && (t = function(t, e, r) {
                        return "" !== r && (e.mods = r), e }(n, t[0], t[1])), null === t && (pos = n), null === t && (n = pos, s = pos, t = parse_numberOfDice(), null !== t ? ("t" === input.substr(pos, 1).toLowerCase() ? (e = input.substr(pos, 1), pos++) : (e = null, 0 === reportFailures && matchFailed('"t"')), null !== e ? (r = parse_inlineLabel(), null !== r ? t = [t, e, r] : (t = null, pos = s)) : (t = null, pos = s)) : (t = null, pos = s), null !== t && (t = function(t, e, r) {
                        return new TableRollExpression(e, r.text) }(n, t[0], t[2])), null === t && (pos = n)), t }

                function parse_coreRoll() {
                    var t, e, r, n, s;
                    return n = pos, s = pos, t = parse_numberOfDice(), null !== t ? ("d" === input.substr(pos, 1).toLowerCase() ? (e = input.substr(pos, 1), pos++) : (e = null, 0 === reportFailures && matchFailed('"d"')), null !== e ? ("f" === input.substr(pos, 1).toLowerCase() ? (r = input.substr(pos, 1), pos++) : (r = null, 0 === reportFailures && matchFailed('"f"')), null !== r ? t = [t, e, r] : (t = null, pos = s)) : (t = null, pos = s)) : (t = null, pos = s), null !== t && (t = function(t, e) {
                        return new FateRollExpression(e) }(n, t[0])), null === t && (pos = n), null === t && (n = pos, s = pos, t = parse_numberOfDice(), null !== t ? ("d" === input.substr(pos, 1).toLowerCase() ? (e = input.substr(pos, 1), pos++) : (e = null, 0 === reportFailures && matchFailed('"d"')), null !== e ? (r = parse_numberOfSides(), null !== r ? t = [t, e, r] : (t = null, pos = s)) : (t = null, pos = s)) : (t = null, pos = s), null !== t && (t = function(t, e, r) {
                        return new RollExpression(e, r) }(n, t[0], t[2])), null === t && (pos = n)), t }

                function parse_numberOfDice() {
                    var result0, result1, result2, result3, result4, pos0, pos1;
                    return result0 = parse_integer(), null === result0 && (pos0 = pos, pos1 = pos, 40 === input.charCodeAt(pos) ? (result0 = "(", pos++) : (result0 = null, 0 === reportFailures && matchFailed('"("')), null !== result0 ? (result1 = parse__(), null !== result1 ? (result2 = parse_mathExpression(), null !== result2 ? (result3 = parse__(), null !== result3 ? (41 === input.charCodeAt(pos) ? (result4 = ")", pos++) : (result4 = null, 0 === reportFailures && matchFailed('")"')), null !== result4 ? result0 = [result0, result1, result2, result3, result4] : (result0 = null, pos = pos1)) : (result0 = null, pos = pos1)) : (result0 = null, pos = pos1)) : (result0 = null, pos = pos1)) : (result0 = null, pos = pos1), null !== result0 && (result0 = function(offset, expr) {
                        return Math.round(eval("(" + expr + ")")) }(pos0, result0[2])), null === result0 && (pos = pos0), null === result0 && (pos0 = pos, result0 = "", null !== result0 && (result0 = function() {
                        return 1 }(pos0)), null === result0 && (pos = pos0))), result0 }

                function parse_numberOfSides() {
                    var result0, result1, result2, result3, result4, pos0, pos1;
                    return result0 = parse_integer(), null === result0 && (pos0 = pos, pos1 = pos, 40 === input.charCodeAt(pos) ? (result0 = "(", pos++) : (result0 = null, 0 === reportFailures && matchFailed('"("')), null !== result0 ? (result1 = parse__(), null !== result1 ? (result2 = parse_mathExpression(), null !== result2 ? (result3 = parse__(), null !== result3 ? (41 === input.charCodeAt(pos) ? (result4 = ")", pos++) : (result4 = null, 0 === reportFailures && matchFailed('")"')), null !== result4 ? result0 = [result0, result1, result2, result3, result4] : (result0 = null, pos = pos1)) : (result0 = null, pos = pos1)) : (result0 = null, pos = pos1)) : (result0 = null, pos = pos1)) : (result0 = null, pos = pos1), null !== result0 && (result0 = function(offset, expr) {
                        return Math.round(eval("(" + expr + ")")) }(pos0, result0[2])), null === result0 && (pos = pos0), null === result0 && (pos0 = pos, "f" === input.substr(pos, 1).toLowerCase() ? (result0 = input.substr(pos, 1), pos++) : (result0 = null, 0 === reportFailures && matchFailed('"f"')), null !== result0 && (result0 = function() {
                        return "F" }(pos0)), null === result0 && (pos = pos0))), result0 }

                function parse_groupMods() {
                    var t, e, r, n, s;
                    if (n = pos, s = pos, t = parse_keepMod(), null === t && (t = parse_dropMod(), null === t && (t = parse_multipleMod(), null === t && (t = parse_successMod()))), null !== t) {
                        for (e = [], r = parse_groupMods(); null !== r;) e.push(r), r = parse_groupMods();
                        null !== e ? t = [t, e] : (t = null, pos = s) } else t = null, pos = s;
                    return null !== t && (t = function(t, e, r) {
                        return processMods(e, r) }(n, t[0], t[1])), null === t && (pos = n), t }

                function parse_rollMods() {
                    var t, e, r, n, s;
                    if (n = pos, s = pos, t = parse_compoundingMod(), null === t && (t = parse_penetratingMod(), null === t && (t = parse_explodingMod(), null === t && (t = parse_keepMod(), null === t && (t = parse_dropMod(), null === t && (t = parse_rerollOnceMod(), null === t && (t = parse_rerollMod(), null === t && (t = parse_customCritMod(), null === t && (t = parse_customFumbleMod(), null === t && (t = parse_sortMod(), null === t && (t = parse_successMod())))))))))), null !== t) {
                        for (e = [], r = parse_rollMods(); null !== r;) e.push(r), r = parse_rollMods();
                        null !== e ? t = [t, e] : (t = null, pos = s)
                    } else t = null, pos = s;
                    return null !== t && (t = function(t, e, r) {
                        return processMods(e, r) }(n, t[0], t[1])), null === t && (pos = n), t
                }

                function parse_explodingMod() {
                    var t, e, r, n;
                    return r = pos, n = pos, 33 === input.charCodeAt(pos) ? (t = "!", pos++) : (t = null, 0 === reportFailures && matchFailed('"!"')), null !== t ? (e = parse_comparisonPoint(), e = null !== e ? e : "", null !== e ? t = [t, e] : (t = null, pos = n)) : (t = null, pos = n), null !== t && (t = function(t, e) {
                        return { exploding: e } }(r, t[1])), null === t && (pos = r), t }

                function parse_compoundingMod() {
                    var t, e, r, n;
                    return r = pos, n = pos, "!!" === input.substr(pos, 2) ? (t = "!!", pos += 2) : (t = null, 0 === reportFailures && matchFailed('"!!"')), null !== t ? (e = parse_comparisonPoint(), e = null !== e ? e : "", null !== e ? t = [t, e] : (t = null, pos = n)) : (t = null, pos = n), null !== t && (t = function(t, e) {
                        return { compounding: e } }(r, t[1])), null === t && (pos = r), t }

                function parse_penetratingMod() {
                    var t, e, r, n, s;
                    return n = pos, s = pos, 33 === input.charCodeAt(pos) ? (t = "!", pos++) : (t = null, 0 === reportFailures && matchFailed('"!"')), null !== t ? ("p" === input.substr(pos, 1).toLowerCase() ? (e = input.substr(pos, 1), pos++) : (e = null, 0 === reportFailures && matchFailed('"p"')), null !== e ? (r = parse_comparisonPoint(), r = null !== r ? r : "", null !== r ? t = [t, e, r] : (t = null, pos = s)) : (t = null, pos = s)) : (t = null, pos = s), null !== t && (t = function(t, e) {
                        return { penetrating: e } }(n, t[2])), null === t && (pos = n), t }

                function parse_keepMod() {
                    var t, e, r, n, s;
                    return n = pos, s = pos, "k" === input.substr(pos, 1).toLowerCase() ? (t = input.substr(pos, 1), pos++) : (t = null, 0 === reportFailures && matchFailed('"k"')), null !== t ? (/^['h'|'l']/i.test(input.charAt(pos)) ? (e = input.charAt(pos), pos++) : (e = null, 0 === reportFailures && matchFailed("['h'|'l']i")), e = null !== e ? e : "", null !== e ? (r = parse_integer(), null !== r ? t = [t, e, r] : (t = null, pos = s)) : (t = null, pos = s)) : (t = null, pos = s), null !== t && (t = function(t, e, r) {
                        return { keep: { end: e.toLowerCase() || "h", count: r } } }(n, t[1], t[2])), null === t && (pos = n), t }

                function parse_dropMod() {
                    var t, e, r, n, s;
                    return n = pos, s = pos, "d" === input.substr(pos, 1).toLowerCase() ? (t = input.substr(pos, 1), pos++) : (t = null, 0 === reportFailures && matchFailed('"d"')), null !== t ? (/^['h'|'l']/i.test(input.charAt(pos)) ? (e = input.charAt(pos), pos++) : (e = null, 0 === reportFailures && matchFailed("['h'|'l']i")), e = null !== e ? e : "", null !== e ? (r = parse_integer(), null !== r ? t = [t, e, r] : (t = null, pos = s)) : (t = null, pos = s)) : (t = null, pos = s), null !== t && (t = function(t, e, r) {
                        return { drop: { end: e.toLowerCase() || "l", count: r } } }(n, t[1], t[2])), null === t && (pos = n), t }

                function parse_customCritMod() {
                    var t, e, r, n, s;
                    return n = pos, s = pos, "cs" === input.substr(pos, 2).toLowerCase() ? (t = input.substr(pos, 2), pos += 2) : (t = null, 0 === reportFailures && matchFailed('"cs"')), null !== t ? (e = parse_comparisonPoint(), e = null !== e ? e : "", null !== e ? (r = parse_customCritMod(), r = null !== r ? r : "", null !== r ? t = [t, e, r] : (t = null, pos = s)) : (t = null, pos = s)) : (t = null, pos = s), null !== t && (t = function(t, e, r) {
                        var n = { customCrit: "" !== e ? [e] : [{}] };
                        return "" !== r && (n.customCrit = n.customCrit.concat(r.customCrit)), n }(n, t[1], t[2])), null === t && (pos = n), t }

                function parse_customFumbleMod() {
                    var t, e, r, n, s;
                    return n = pos, s = pos, "cf" === input.substr(pos, 2).toLowerCase() ? (t = input.substr(pos, 2), pos += 2) : (t = null, 0 === reportFailures && matchFailed('"cf"')), null !== t ? (e = parse_comparisonPoint(), e = null !== e ? e : "", null !== e ? (r = parse_customFumbleMod(), r = null !== r ? r : "", null !== r ? t = [t, e, r] : (t = null, pos = s)) : (t = null, pos = s)) : (t = null, pos = s), null !== t && (t = function(t, e, r) {
                        var n = { customFumble: "" !== e ? [e] : [{}] };
                        return "" !== r && (n.customFumble = n.customFumble.concat(r.customFumble)), n }(n, t[1], t[2])), null === t && (pos = n), t }

                function parse_rerollMod() {
                    var t, e, r, n, s;
                    return n = pos, s = pos, "r" === input.substr(pos, 1).toLowerCase() ? (t = input.substr(pos, 1), pos++) : (t = null, 0 === reportFailures && matchFailed('"r"')), null !== t ? (e = parse_comparisonPoint(), e = null !== e ? e : "", null !== e ? (r = parse_rerollMod(), r = null !== r ? r : "", null !== r ? t = [t, e, r] : (t = null, pos = s)) : (t = null, pos = s)) : (t = null, pos = s), null !== t && (t = function(t, e, r) {
                        var n = { reroll: "" !== e ? [e] : [{}] };
                        return "" !== r && (n.reroll = n.reroll.concat(r.reroll)), n }(n, t[1], t[2])), null === t && (pos = n), t }

                function parse_rerollOnceMod() {
                    var t, e, r, n, s;
                    return n = pos, s = pos, "ro" === input.substr(pos, 2).toLowerCase() ? (t = input.substr(pos, 2), pos += 2) : (t = null, 0 === reportFailures && matchFailed('"ro"')), null !== t ? (e = parse_comparisonPoint(), e = null !== e ? e : "", null !== e ? (r = parse_rerollMod(), r = null !== r ? r : "", null !== r ? t = [t, e, r] : (t = null, pos = s)) : (t = null, pos = s)) : (t = null, pos = s), null !== t && (t = function(t, e, r) {
                        var n = { reroll: "" !== e ? [e] : [{}] };
                        return "" !== r && (n.reroll = n.reroll.concat(r.reroll)), n.reroll && n.reroll[0] && (n.reroll[0].maxrerolls = 1), n }(n, t[1], t[2])), null === t && (pos = n), t }

                function parse_sortMod() {
                    var t, e, r, n;
                    return r = pos, n = pos, "s" === input.substr(pos, 1).toLowerCase() ? (t = input.substr(pos, 1), pos++) : (t = null, 0 === reportFailures && matchFailed('"s"')), null !== t ? (/^['a'|'d']/i.test(input.charAt(pos)) ? (e = input.charAt(pos), pos++) : (e = null, 0 === reportFailures && matchFailed("['a'|'d']i")), e = null !== e ? e : "", null !== e ? t = [t, e] : (t = null, pos = n)) : (t = null, pos = n), null !== t && (t = function(t, e) {
                        return { sort: { order: e.toLowerCase() || "a" } } }(r, t[1])), null === t && (pos = r), t }

                function parse_floorMod() {
                    var t, e;
                    return e = pos, "flr" === input.substr(pos, 3) ? (t = "flr", pos += 3) : (t = null, 0 === reportFailures && matchFailed('"flr"')), null !== t && (t = function() {
                        return { round: { type: "floor" } } }(e)), null === t && (pos = e), t }

                function parse_multipleMod() {
                    var t, e, r, n;
                    return r = pos, n = pos, "x" === input.substr(pos, 1).toLowerCase() ? (t = input.substr(pos, 1), pos++) : (t = null, 0 === reportFailures && matchFailed('"x"')), null !== t ? (e = parse_integer(), null !== e ? t = [t, e] : (t = null, pos = n)) : (t = null, pos = n), null !== t && (t = function(t, e) {
                        return { multiple: { times: e } } }(r, t[1])), null === t && (pos = r), t }

                function parse_successMod() {
                    var t, e, r, n, s, o;
                    return n = pos, s = pos, t = parse_comparisonPoint(), null !== t ? (o = pos, "f" === input.substr(pos, 1).toLowerCase() ? (e = input.substr(pos, 1), pos++) : (e = null, 0 === reportFailures && matchFailed('"f"')), null !== e ? (r = parse_comparisonPoint(), null !== r ? e = [e, r] : (e = null, pos = o)) : (e = null, pos = o), e = null !== e ? e : "", null !== e ? t = [t, e] : (t = null, pos = s)) : (t = null, pos = s), null !== t && (t = function(t, e, r) {
                        var n = { success: e };
                        return "" !== r && (n.failure = r[1]), n }(n, t[0], t[1])), null === t && (pos = n), t }

                function parse_comparisonPoint() {
                    var t, e, r, n;
                    return r = pos, n = pos, t = parse_comparison(), t = null !== t ? t : "", null !== t ? (e = parse_integer(), null !== e ? t = [t, e] : (t = null, pos = n)) : (t = null, pos = n), null !== t && (t = function(t, e, r) {
                        return { comp: ("" == e ? "=" : e) + "=", point: r } }(r, t[0], t[1])), null === t && (pos = r), t }

                function parse_comparison() {
                    var t;
                    return /^[>|<|=]/.test(input.charAt(pos)) ? (t = input.charAt(pos), pos++) : (t = null, 0 === reportFailures && matchFailed("[>|<|=]")), t }

                function parse_mathExpression() {
                    var t, e, r, n, s, o, i, l, a;
                    return l = pos, a = pos, t = parse__(), null !== t ? (e = parse_mathExpressionPrimary(), null !== e ? (r = parse__(), null !== r ? (n = parse_operator(), null !== n ? (s = parse__(), null !== s ? (o = parse_mathExpression(), null !== o ? (i = parse__(), null !== i ? t = [t, e, r, n, s, o, i] : (t = null, pos = a)) : (t = null, pos = a)) : (t = null, pos = a)) : (t = null, pos = a)) : (t = null, pos = a)) : (t = null, pos = a)) : (t = null, pos = a), null !== t && (t = function(t, e, r, n) {
                        return e + r + n }(l, t[1], t[3], t[5])), null === t && (pos = l), null === t && (l = pos, a = pos, t = parse__(), null !== t ? (e = parse_mathExpressionPrimary(), null !== e ? (r = parse__(), null !== r ? t = [t, e, r] : (t = null, pos = a)) : (t = null, pos = a)) : (t = null, pos = a), null !== t && (t = function(t, e) {
                        return e }(l, t[1])), null === t && (pos = l)), t }

                function parse_mathExpressionPrimary() {
                    var t, e, r, n, s, o, i;
                    return o = pos, i = pos, t = parse__(), null !== t ? (e = parse_number(), null !== e ? (r = parse__(), null !== r ? t = [t, e, r] : (t = null, pos = i)) : (t = null, pos = i)) : (t = null, pos = i), null !== t && (t = function(t, e) {
                        return e }(o, t[1])), null === t && (pos = o), null === t && (o = pos, i = pos, 40 === input.charCodeAt(pos) ? (t = "(", pos++) : (t = null, 0 === reportFailures && matchFailed('"("')), null !== t ? (e = parse__(), null !== e ? (r = parse_mathExpression(), null !== r ? (n = parse__(), null !== n ? (41 === input.charCodeAt(pos) ? (s = ")", pos++) : (s = null, 0 === reportFailures && matchFailed('")"')), null !== s ? t = [t, e, r, n, s] : (t = null, pos = i)) : (t = null, pos = i)) : (t = null, pos = i)) : (t = null, pos = i)) : (t = null, pos = i), null !== t && (t = function(t, e) {
                        return "(" + e + ")" }(o, t[2])), null === t && (pos = o)), t }

                function parse_inlineLabelWithSpace() {
                    var t, e, r, n, s;
                    return n = pos, s = pos, t = parse__(), null !== t ? (e = parse_inlineLabel(), null !== e ? (r = parse__(), null !== r ? t = [t, e, r] : (t = null, pos = s)) : (t = null, pos = s)) : (t = null, pos = s), null !== t && (t = function(t, e) {
                        return e }(n, t[1])), null === t && (pos = n), t }

                function parse_inlineLabel() {
                    var t, e, r, n, s;
                    if (n = pos, s = pos, 91 === input.charCodeAt(pos) ? (t = "[", pos++) : (t = null, 0 === reportFailures && matchFailed('"["')), null !== t) {
                        for (e = [], /^[^\]]/.test(input.charAt(pos)) ? (r = input.charAt(pos), pos++) : (r = null, 0 === reportFailures && matchFailed("[^\\]]")); null !== r;) e.push(r), /^[^\]]/.test(input.charAt(pos)) ? (r = input.charAt(pos), pos++) : (r = null, 0 === reportFailures && matchFailed("[^\\]]"));
                        null !== e ? (93 === input.charCodeAt(pos) ? (r = "]", pos++) : (r = null, 0 === reportFailures && matchFailed('"]"')), null !== r ? t = [t, e, r] : (t = null, pos = s)) : (t = null, pos = s) } else t = null, pos = s;
                    return null !== t && (t = function(t, e) {
                        return new Label(e.join("")) }(n, t[1])), null === t && (pos = n), t }

                function parse_operator() {
                    var t;
                    return /^[+|\-|*|\/|%]/.test(input.charAt(pos)) ? (t = input.charAt(pos), pos++) : (t = null, 0 === reportFailures && matchFailed("[+|\\-|*|\\/|%]")), t }

                function parse_number() {
                    var t;
                    return t = parse_exponent(), null === t && (t = parse_float(), null === t && (t = parse_signedInteger())), t }

                function parse_integer() {
                    var t, e, r;
                    if (r = pos, /^[0-9]/.test(input.charAt(pos)) ? (e = input.charAt(pos), pos++) : (e = null, 0 === reportFailures && matchFailed("[0-9]")), null !== e)
                        for (t = []; null !== e;) t.push(e), /^[0-9]/.test(input.charAt(pos)) ? (e = input.charAt(pos), pos++) : (e = null, 0 === reportFailures && matchFailed("[0-9]"));
                    else t = null;
                    return null !== t && (t = function(t, e) {
                        return parseInt(e.join(""), 10) }(r, t)), null === t && (pos = r), t }

                function parse_signedInteger() {
                    var t, e, r, n;
                    return r = pos, n = pos, /^[+|\-]/.test(input.charAt(pos)) ? (t = input.charAt(pos), pos++) : (t = null, 0 === reportFailures && matchFailed("[+|\\-]")), t = null !== t ? t : "", null !== t ? (e = parse_integer(), null !== e ? t = [t, e] : (t = null, pos = n)) : (t = null, pos = n), null !== t && (t = function(t, e, r) {
                        return "-" == e ? -1 * r : r }(r, t[0], t[1])), null === t && (pos = r), t }

                function parse_float() {
                    var t, e, r, n, s, o;
                    if (s = pos, o = pos, t = parse_signedInteger(), t = null !== t ? t : "", null !== t)
                        if (46 === input.charCodeAt(pos) ? (e = ".", pos++) : (e = null, 0 === reportFailures && matchFailed('"."')), null !== e) {
                            if (/^[0-9]/.test(input.charAt(pos)) ? (n = input.charAt(pos), pos++) : (n = null, 0 === reportFailures && matchFailed("[0-9]")), null !== n)
                                for (r = []; null !== n;) r.push(n), /^[0-9]/.test(input.charAt(pos)) ? (n = input.charAt(pos), pos++) : (n = null, 0 === reportFailures && matchFailed("[0-9]"));
                            else r = null;
                            null !== r ? t = [t, e, r] : (t = null, pos = o) } else t = null, pos = o;
                    else t = null, pos = o;
                    return null !== t && (t = function(t, e, r) {
                        return 0 === e && 0 > 1 / e ? -1 * parseFloat(e + "." + r.join("")) : parseFloat(e + "." + r.join("")) }(s, t[0], t[2])), null === t && (pos = s), t }

                function parse_exponent() {
                    var t, e, r, n, s, o, i;
                    return o = pos, i = pos, t = parse_signedInteger(), t = null !== t ? t : "", null !== t ? (46 === input.charCodeAt(pos) ? (e = ".", pos++) : (e = null, 0 === reportFailures && matchFailed('"."')), null !== e ? (r = parse_integer(), null !== r ? (101 === input.charCodeAt(pos) ? (n = "e", pos++) : (n = null, 0 === reportFailures && matchFailed('"e"')), null !== n ? (s = parse_signedInteger(), null !== s ? t = [t, e, r, n, s] : (t = null, pos = i)) : (t = null, pos = i)) : (t = null, pos = i)) : (t = null, pos = i)) : (t = null, pos = i), null !== t && (t = function(t, e, r, n) {
                        return parseFloat(e + "." + r + "e" + n) }(o, t[0], t[2], t[4])), null === t && (pos = o), null === t && (o = pos, i = pos, t = parse_signedInteger(), null !== t ? (101 === input.charCodeAt(pos) ? (e = "e", pos++) : (e = null, 0 === reportFailures && matchFailed('"e"')), null !== e ? (r = parse_signedInteger(), null !== r ? t = [t, e, r] : (t = null, pos = i)) : (t = null, pos = i)) : (t = null, pos = i), null !== t && (t = function(t, e, r) {
                        return parseFloat(e + "e" + r) }(o, t[0], t[2])), null === t && (pos = o)), t }

                function parse__() {
                    var t, e, r;
                    for (r = pos, t = [], /^[ |\t]/.test(input.charAt(pos)) ? (e = input.charAt(pos), pos++) : (e = null, 0 === reportFailures && matchFailed("[ |\\t]")); null !== e;) t.push(e), /^[ |\t]/.test(input.charAt(pos)) ? (e = input.charAt(pos), pos++) : (e = null, 0 === reportFailures && matchFailed("[ |\\t]"));
                    return null !== t && (t = function(t, e) {
                        return e.join("") }(r, t)), null === t && (pos = r), t }

                function parse___() {
                    var t, e, r;
                    if (r = pos, /^[ |\t]/.test(input.charAt(pos)) ? (e = input.charAt(pos), pos++) : (e = null, 0 === reportFailures && matchFailed("[ |\\t]")), null !== e)
                        for (t = []; null !== e;) t.push(e), /^[ |\t]/.test(input.charAt(pos)) ? (e = input.charAt(pos), pos++) : (e = null, 0 === reportFailures && matchFailed("[ |\\t]"));
                    else t = null;
                    return null !== t && (t = function(t, e) {
                        return e.join("") }(r, t)), null === t && (pos = r), t }

                function cleanupExpected(t) { t.sort();
                    for (var e = null, r = [], n = 0; n < t.length; n++) t[n] !== e && (r.push(t[n]), e = t[n]);
                    return r }

                function computeErrorPosition() {
                    for (var t = 1, e = 1, r = !1, n = 0; n < Math.max(pos, rightmostFailuresPos); n++) {
                        var s = input.charAt(n); "\n" === s ? (r || t++, e = 1, r = !1) : "\r" === s || "\u2028" === s || "\u2029" === s ? (t++, e = 1, r = !0) : (e++, r = !1) }
                    return { line: t, column: e } }

                function log(t) { console.log(t) }

                function MathExpression(t) { this.type = d20.dice.TYPE_MATH_EXPR, this.expr = void 0 != t ? t : "" }

                function RollExpression(t, e) { this.type = d20.dice.TYPE_ROLL_EXPR, this.dice = t, this.sides = e, this.mods = {} }

                function FateRollExpression(t) { this.type = d20.dice.TYPE_ROLL_EXPR, this.dice = t, this.fate = !0, this.mods = {} }

                function TableRollExpression(t, e) { this.type = d20.dice.TYPE_ROLL_EXPR, this.dice = t, this.table = e, this.mods = {} }

                function GroupExpression(t, e) { this.type = d20.dice.TYPE_GROUP_EXPR, this.rolls = t, this.mods = e || {} }

                function Label(t) { this.type = d20.dice.TYPE_LABEL, this.text = t }

                function Comment(t) { this.type = d20.dice.TYPE_COMMENT, this.text = t }

                function mergeExpressions(t, e) {
                    if ("string" == typeof t) {
                        if (0 == t.length) return e;
                        t = new MathExpression(t) }
                    if ("string" == typeof e) {
                        if (0 == e.length) return t;
                        e = new MathExpression(e) }
                    if (Array.isArray(t) && Array.isArray(e)) {
                        if (t[t.length - 1].type == d20.dice.TYPE_MATH_EXPR && e[0].type == d20.dice.TYPE_MATH_EXPR) {
                            var r = t.pop();
                            e[0].expr = r.expr + e[0].expr }
                        return t.concat(e) }
                    return Array.isArray(t) ? (t[t.length - 1].type == d20.dice.TYPE_MATH_EXPR && e.type == d20.dice.TYPE_MATH_EXPR ? t[t.length - 1].expr += e.expr : t.push(e), t) : Array.isArray(e) ? (e[0].type == d20.dice.TYPE_MATH_EXPR && t.type == d20.dice.TYPE_MATH_EXPR ? e[0].expr = t.expr + e[0].expr : e.unshift(t), e) : t.type == d20.dice.TYPE_MATH_EXPR && e.type == d20.dice.TYPE_MATH_EXPR ? (t.expr += e.expr, t) : [t, e] }

                function processMods(t, e) {
                    var r = t;
                    if (e.length > 0)
                        for (var n in e[0]) {
                            if (void 0 != r[n]) throw { message: "'" + n + "' roll modifier can only be specified once" };
                            r[n] = e[0][n] }
                    return r }
                var parseFunctions = { start: parse_start, rollExpression: parse_rollExpression, rollExpressionPrimary: parse_rollExpressionPrimary, validRollSuffix: parse_validRollSuffix, rollGroup: parse_rollGroup, rollGroupExpression: parse_rollGroupExpression, labelAwareRollOperator: parse_labelAwareRollOperator, rollOperator: parse_rollOperator, fullRoll: parse_fullRoll, coreRoll: parse_coreRoll, numberOfDice: parse_numberOfDice, numberOfSides: parse_numberOfSides, groupMods: parse_groupMods, rollMods: parse_rollMods, explodingMod: parse_explodingMod, compoundingMod: parse_compoundingMod, penetratingMod: parse_penetratingMod, keepMod: parse_keepMod, dropMod: parse_dropMod, customCritMod: parse_customCritMod, customFumbleMod: parse_customFumbleMod, rerollMod: parse_rerollMod, rerollOnceMod: parse_rerollOnceMod, sortMod: parse_sortMod, floorMod: parse_floorMod, multipleMod: parse_multipleMod, successMod: parse_successMod, comparisonPoint: parse_comparisonPoint, comparison: parse_comparison, mathExpression: parse_mathExpression, mathExpressionPrimary: parse_mathExpressionPrimary, inlineLabelWithSpace: parse_inlineLabelWithSpace, inlineLabel: parse_inlineLabel, operator: parse_operator, number: parse_number, integer: parse_integer, signedInteger: parse_signedInteger, "float": parse_float, exponent: parse_exponent, _: parse__, __: parse___ };
                if (void 0 !== startRule) {
                    if (void 0 === parseFunctions[startRule]) throw new Error("Invalid rule name: " + quote(startRule) + ".") } else startRule = "start";
                var pos = 0,
                    reportFailures = 0,
                    rightmostFailuresPos = 0,
                    rightmostFailuresExpected = [],
                    d20 = "undefined" != typeof global && void 0 !== global.d20 ? global.d20 : {};
                void 0 == d20.dice && (d20.dice = d20.dice || {}, d20.dice.TYPE_MATH_EXPR = "M", d20.dice.TYPE_ROLL_EXPR = "R", d20.dice.TYPE_GROUP_EXPR = "G", d20.dice.TYPE_LABEL = "L", d20.dice.TYPE_COMMENT = "C", d20.dice.TYPE_VALIDATED_ROLLS = "V");
                var result = parseFunctions[startRule]();
                if (null === result || pos !== input.length) {
                    var offset = Math.max(pos, rightmostFailuresPos),
                        found = offset < input.length ? input.charAt(offset) : null,
                        errorPosition = computeErrorPosition();
                    throw new this.SyntaxError(cleanupExpected(rightmostFailuresExpected), found, offset, errorPosition.line, errorPosition.column) }
                return result
            },
            toSource: function() {
                return this._source }
        };
        return result.SyntaxError = function(t, e, r, n, s) {
            function o(t, e) {
                var r, n;
                switch (t.length) {
                    case 0:
                        r = "end of input";
                        break;
                    case 1:
                        r = t[0];
                        break;
                    default:
                        r = t.slice(0, t.length - 1).join(", ") + " or " + t[t.length - 1] }
                return n = e ? quote(e) : "end of input", "Expected " + r + " but " + n + " found." }
            this.name = "SyntaxError", this.expected = t, this.found = e, this.message = o(t, e), this.offset = r, this.line = n, this.column = s }, result.SyntaxError.prototype = Error.prototype, result
    }(), d20.dice_formatter = {}, d20ext.dice_formatter = d20.dice_formatter,
    function() {
        var t = function() {},
            e = function(r) {
                for (var n = "", s = 0; s < r.length; s++) {
                    if (r[s].type === d20.dice.TYPE_GROUP_EXPR) { console.log("Descending into madness..."), n += "{<div class='parsegroup'>";
                        for (var o = 0; o < r[s].rolls.length; o++) n += "<div class='parsegroupitem ", r[s].results && r[s].results[o].d && (n += "dropped"), n += "'>", n += e(r[s].rolls[o]), o + 1 < r[s].rolls.length && (n += " + "), n += "</div>";
                        n += "</div>}" }
                    if (r[s].type === d20.dice.TYPE_ROLL_EXPR) { n += "<div class='dicegrouping' data-groupindex='" + s + "' ", r[s + 1] && r[s + 1].type == d20.dice.TYPE_LABEL && (n += "title='" + r[s + 1].text.replace(/'/g, "&apos;") + "'"), n += ">", n += "(";
                        for (var i = 0; i < r[s].results.length; i++) { n += "<div data-origindex='" + i + "' class='diceroll ", r[s].results.length > 50 && (n += "withouticons "), r[s].fate ? n += "d6" : r[s].table || (n += "d" + r[s].sides), r[s].results[i].d === !0 && (n += " dropped ");
                            var l = !1,
                                a = !1;
                            if (r[s].mods && r[s].mods.customCrit ? _.each(r[s].mods.customCrit, function(t) { "<=" === t.comp ? r[s].results[i].v <= t.point && (l = !0) : ">=" === t.comp ? r[s].results[i].v >= t.point && (l = !0) : "==" === t.comp && r[s].results[i].v === t.point && (l = !0) }) : r[s].results[i].v === r[s].sides && (l = !0), l && (n += " critsuccess ", t()), r[s].mods && r[s].mods.customFumble ? _.each(r[s].mods.customFumble, function(t) { "<=" === t.comp ? r[s].results[i].v <= t.point && (a = !0) : ">=" === t.comp ? r[s].results[i].v >= t.point && (a = !0) : "==" === t.comp && r[s].results[i].v === t.point && (a = !0) }) : 1 === r[s].results[i].v && r[s].fate !== !0 && (a = !0), a && (n += " critfail "), n += "'><div class='dicon'><div class='didroll'>", r[s].fate === !0) switch (r[s].results[i].v) {
                                case 1:
                                    n += "+";
                                    break;
                                case 0:
                                    n += "0";
                                    break;
                                case -1:
                                    n += "-" } else n += r[s].results[i].tableItem ? r[s].results[i].tableItem.avatar && "" != r[s].results[i].tableItem.avatar ? "<img src='" + r[s].results[i].tableItem.avatar + "' title='" + r[s].results[i].tableItem.name.replace(/'/g, "&apos;") + "' />" : r[s].results[i].tableItem.name : r[s].results[i].v;
                            n += "</div><div class='backing'></div></div>", r[s].fate !== !0 && i + 1 < r[s].results.length && (n += "+"), n += "</div>" }
                        n += ")", n += "</div>" } else r[s].type === d20.dice.TYPE_MATH_EXPR && (n += r[s].expr) }
                return n },
            r = function(t) {
                if (t) {
                    for (var e = "", n = 0; n < t.length; n++) {
                        if (t[n].mods && t[n].mods.keep) {
                            var s = t[n].results.map(function(t) {
                                    return t.v }).sort(function(t, e) {
                                    return parseInt(t) > parseInt(e) }),
                                o = s.length,
                                i = t[n].mods.keep.count > o ? o : t[n].mods.keep.count;
                            s = "h" === t[n].mods.keep.end ? s.slice(0, -1 * i) : s.slice(i) }
                        if (t[n].type === d20.dice.TYPE_GROUP_EXPR) { console.log("Descending into madness..."), e += "{";
                            for (var l = 0; l < t[n].rolls.length; l++) e += r(t[n].rolls[l]), l + 1 < t[n].rolls.length && (e += "+");
                            e += "}" }
                        if (t[n].type === d20.dice.TYPE_ROLL_EXPR) {
                            var a = void 0 !== t[n].results ? t[n].results.length : 0;
                            e += "(";
                            for (var u = 0; a > u; u++) {
                                if (e += "<span class='basicdiceroll", s && (dd = s.indexOf(t[n].results[u].v)) > -1) e += " dropped ", s.splice(dd, 1);
                                else {
                                    var p = !1,
                                        c = !1;
                                    t[n].mods && t[n].mods.customCrit ? _.each(t[n].mods.customCrit, function(e) { "<=" === e.comp ? t[n].results[u].v <= e.point && (p = !0) : ">=" === e.comp ? t[n].results[u].v >= e.point && (p = !0) : "==" === e.comp && t[n].results[u].v === e.point && (p = !0) }) : t[n].results[u].v === t[n].sides && (p = !0), p && (e += " critsuccess "), t[n].mods && t[n].mods.customFumble ? _.each(t[n].mods.customFumble, function(e) { "<=" === e.comp ? t[n].results[u].v <= e.point && (c = !0) : ">=" === e.comp ? t[n].results[u].v >= e.point && (c = !0) : "==" === e.comp && t[n].results[u].v === e.point && (c = !0) }) : 1 === t[n].results[u].v && t[n].fate !== !0 && (c = !0), c && (e += " critfail ") }
                                if (e += "'>", t[n].fate === !0) switch (t[n].results[u].v) {
                                    case 1:
                                        e += "+";
                                        break;
                                    case 0:
                                        e += "0";
                                        break;
                                    case -1:
                                        e += "-" } else e += t[n].results[u].tableItem ? t[n].results[u].tableItem.name : t[n].results[u].v;
                                e += "</span>", t[n].fate !== !0 && u + 1 < t[n].results.length && (e += "+") }
                            e += ")" } else t[n].type === d20.dice.TYPE_MATH_EXPR && (e += t[n].expr) }
                    return e } };
        d20.dice_formatter.checkForCrits = function(t, e) {
            if (!t) return !1;
            for (var r = !1, n = !1, s = 0; s < t.length; s++) {
                if (t[s].type === d20.dice.TYPE_GROUP_EXPR)
                    for (var o = 0; o < t[s].rolls.length; o++) d20.dice_formatter.checkForCrits(t[s].rolls[o], e) === !0 && ("crit" === e ? r = !0 : n = !0);
                if (t[s].type === d20.dice.TYPE_ROLL_EXPR)
                    for (var i = void 0 !== t[s].results ? t[s].results.length : 0, l = 0; i > l; l++) t[s].mods && t[s].mods.customCrit ? _.each(t[s].mods.customCrit, function(e) { "<=" === e.comp ? t[s].results[l].v <= e.point && (r = !0) : ">=" === e.comp ? t[s].results[l].v >= e.point && (r = !0) : "==" === e.comp && t[s].results[l].v === e.point && (r = !0) }) : t[s].results[l].v === t[s].sides && (r = !0), t[s].mods && t[s].mods.customFumble ? _.each(t[s].mods.customFumble, function(e) { "<=" === e.comp ? t[s].results[l].v <= e.point && (n = !0) : ">=" === e.comp ? t[s].results[l].v >= e.point && (n = !0) : "==" === e.comp && t[s].results[l].v === e.point && (n = !0) }) : 1 === t[s].results[l].v && t[s].fate !== !0 && (n = !0) }
            return "crit" === e ? r : n }, d20.dice_formatter.getHtmlForResult = function(t) {
            var r = e(t.rolls);
            return { formula: r, total: t.total + (t.resultType === d20.dice.ROLL_TYPE_SUCCESS ? " Successes" : "") } }, d20.dice_formatter.replaceInlineRolls = function(t, e, n) {
            return t = d20.utils.strip_tags(t, n), e.inlinerolls ? t = t.replace(/\$\[\[[0-9]+\]\]/g, function(t) {
                var n = t.substring(3, t.length - 1),
                    s = e.inlinerolls[parseInt(n, 10)];
                if (!s || !s.results) return "INVALID INLINE ROLL!";
                var o = "Rolling " + s.expression + " = ";
                s.signature && d20.textchat.verifyRoll(s.rollid, s.results, s.signature) && (o = "<img src='/images/quantumrollwhite.png' class='inlineqroll'> " + o), o += r(s.results.rolls);
                var i = s.results.total;
                try { 0 == i && s.results.rolls[0].results[0].tableItem && (i = s.results.rolls[0].results[0].tableItem.name) } catch (l) {}
                var a = "<span class='inlinerollresult showtip tipsy-n",
                    u = -1 !== o.indexOf("critsuccess"),
                    p = -1 !== o.indexOf("critfail");
                return u && p ? a += " importantroll" : u ? a += " fullcrit" : p && (a += " fullfail"), a += "' title='" + o.replace(/'/g, "&quot;") + "'>" + i + "</span>" }) : t };
        var n = { "@": "critsuccess", "#": "critfail", _: "dropped" },
            s = function(t, e) {
                for (var r in n) {
                    var o = new RegExp("\\{" + r + "(.+?)" + r + "\\}", "g");
                    if (null != (match = o.exec(t))) return e.push(n[r]), s(match[1], e) }
                return t };
        d20.dice_formatter.oldformat = function(t) {
            return void 0 === t ? "" : t.replace(/\{([@#_])(.+?)\1\}/g, function(t, e, r) {
                var o = [n[e]],
                    r = s(r, o);
                return "<span class='" + o.sort().join(" ") + "'>" + r + "</span>" }) } }();
var d20 = d20 || {};
d20.dice_engine = function(seed) {
    function TaskCompletionCallback(t, e, r) {
        var n = 0,
            s = !1;
        this.taskComplete = function() {
            if (n == t) throw "All " + n + " tasks have already been completed for: " + r;
            n++, n == t && (s = !0, e()) }, this.verify = function() { n != t || s || e() } }

    function RollResult(t) { this.i = t, this.v = 0 }

    function GroupResult(t) { this.v = t }

    function ValidatedRollExpression(t, e) { this.type = d20.dice.TYPE_VALIDATED_ROLLS, this.rolls = t, this.resultType = e }

    function ExpressionBuilder() {
        var expression = "",
            groupMemeberCount = void 0,
            verifyInGroup = function() {
                if (void 0 == groupMemeberCount) throw "Not currently in a group expression: '" + expression + "'" };
        this.addMathExpr = function(t) { expression += t }, this.startGroup = function() { expression += "(", groupMemeberCount = 0 }, this.addGroupValue = function(t) { verifyInGroup(), groupMemeberCount > 0 && (expression += "+"), expression += t, groupMemeberCount++ }, this.addGroupSuccess = function(t, e) { this.addGroupValue("(" + t + e.comp + e.point + "?1:0)") }, this.addGroupFailure = function(t, e) { this.addGroupValue("(" + t + e.comp + e.point + "?-1:0)") }, this.endGroup = function() { verifyInGroup(), 0 == groupMemeberCount && (expression += "0"), expression += ")", groupMemeberCount = void 0 }, this.eval = function() { log(expression);
            var result, thisexp = expression;
            return function() { "use strict";
                var floor = Math.floor,
                    ceil = Math.ceil,
                    round = Math.round,
                    max = Math.max,
                    min = Math.min,
                    abs = Math.abs;
                try { result = eval(thisexp) } catch (e) { result = 0 } }(), result } }
    d20.dice = d20.dice || {}, d20.dice.TYPE_MATH_EXPR = "M", d20.dice.TYPE_ROLL_EXPR = "R", d20.dice.TYPE_GROUP_EXPR = "G", d20.dice.TYPE_LABEL = "L", d20.dice.TYPE_COMMENT = "C", d20.dice.TYPE_VALIDATED_ROLLS = "V", d20.dice.ROLL_TYPE_SUCCESS = "success", d20.dice.ROLL_TYPE_TABLE = "table", d20.dice.ROLL_TYPE_SUM = "sum", void 0 == d20.getTableElementCount && (d20.getTableElementCount = function(t) {
        return log("Using fallback getTableElementCount(" + t + ")"), t.length }, d20.getTableElementValue = function(t, e) {
        return log("Using fallback getTableElementValue(" + t + ", " + e + ")"), parseInt(t, 10) || 0 });
    var MAX_NUM_ROLLS = 999,
        MAX_ROLL = 9999999;
    console.log("Initializing new dice engine with randomness..."), void 0 == seed ? (console.log("Using random entropy"), Math.seedrandom(global.RANDOM_ENTROPY, !0)) : Math.seedrandom(seed), this.random = Math.randomInt;
    var othis = this,
        log = function(t) {},
        logerr = function(t) { _.isFunction(t) && (t = t()), console.log(t) },
        fallbackErrorHandler = function(t) {
            throw logerr(t), t },
        diceRollToString = function(t) {
            var e = t.dice + "d" + t.sides;
            return t.mods.compounding && (e += "!!" + comparePointToString(t.mods.compounding)), t.mods.penetrating && (e += "!p" + comparePointToString(t.mods.penetrating)), t.mods.exploding && (e += "!" + comparePointToString(t.mods.exploding)), t.mods.keep && (e += "k", "h" != t.mods.keep.end && (e += t.mods.keep.end), e += t.mods.keep.count), t.mods.drop && (e += "k", "l" != t.mods.drop.end && (e += t.mods.drop.end), e += t.mods.drop.count), t.mods.reroll && t.mods.reroll.forEach(function(t) { e += "r" + comparePointToString(t) }), t.mods.sort && (e += "s" + t.mods.sort.order), t.mods.success && (e += comparePointToString(t.mods.success, !0)), t.mods.failure && (e += "f" + comparePointToString(t.mods.failure, !0)), e },
        comparePointToString = function(t, e) {
            var r = "";
            return t.point && (("==" != t.comp || e) && (r += t.comp.charAt(0)), r += t.point), r },
        validateParseResult = function(t) {
            for (var e = void 0, r = 0; r < t.length; r++) {
                if (t[r].type == d20.dice.TYPE_ROLL_EXPR || t[r].type == d20.dice.TYPE_GROUP_EXPR) {
                    var n = getRollType(t[r]);
                    if (void 0 == e) e = n;
                    else if (e != n) throw "Cannot mix " + e + " and " + n + " rolls in a single roll expression" }
                if (t[r].type == d20.dice.TYPE_ROLL_EXPR) {
                    if (t[r].fate ? t[r].sides = 3 : void 0 != t[r].table && (t[r].sides = d20.getTableElementCount(t[r].table)), t[r].fate && void 0 != t[r].mods.compounding) throw "Compounding FATE dice are not legal, try ! instead of !! for exploding FATE dice";
                    if (t[r].mods && void 0 != t[r].mods.exploding && t[r].sides < 2) throw "You must roll a d2 or higher to roll exploding dice.";
                    t[r].dice = Math.max(Math.min(t[r].dice, MAX_NUM_ROLLS), 0), t[r].sides = Math.max(Math.min(t[r].sides, MAX_ROLL), 0) }
                if (t[r].type == d20.dice.TYPE_GROUP_EXPR) {
                    if (1 == t[r].rolls.length && e == d20.dice.ROLL_TYPE_SUCCESS)
                        for (var s = !1, o = 0; o < t[r].rolls[0].length; o++)
                            if (t[r].rolls[0][o].type == d20.dice.TYPE_ROLL_EXPR) {
                                if (s) throw "Only one roll expression is allowed in a single sub-roll expression success check";
                                s = !0 } else if (t[r].rolls[0][o].type == d20.dice.TYPE_GROUP_EXPR) throw t[r].rolls[0][o].type + " expression is not supported in a single sub-roll expression success check";
                    for (var i = void 0, l = 0; l < t[r].rolls.length; l++) {
                        var a = validateParseResult(t[r].rolls[l]);
                        if (void 0 == i) i = a;
                        else if (i != a) throw "Cannot mix " + i + " and " + a + " rolls in a  roll group" }
                    t[r].resultType = i } }
            if (void 0 == e) {
                if (t[0].type === d20.dice.TYPE_MATH_EXPR) return d20.dice.TYPE_MATH_EXPR;
                throw "Could not determine result type of: " + JSON.stringify(t) }
            return e },
        getRollType = function(t) {
            return t.mods && void 0 !== t.mods.success ? d20.dice.ROLL_TYPE_SUCCESS : void 0 != t.sides && t.sides.type == d20.dice.TYPE_LABEL ? d20.dice.ROLL_TYPE_TABLE : d20.dice.ROLL_TYPE_SUM },
        parseRollString = function(t) { log(function() {
                return "E parseRollString: " + t });
            var e = d20.DicePEG.parse(t);
            log(e);
            var r = validateParseResult(e),
                n = new ValidatedRollExpression(e, r);
            return log(n), log(JSON.stringify(n)), log(function() {
                return "L parseRollString: " + n.rolls.length + " expressions from: " + t }), n },
        initiateRolls = function(t, e, r) {
            for (var n = 0; n < t.length; n++) t[n].type == d20.dice.TYPE_ROLL_EXPR ? doRolls(t[n], r) : t[n].type == d20.dice.TYPE_GROUP_EXPR ? initiateGroupRolls(t[n], e, r) : r() },
        initiateGroupRolls = function(t, e, r) {
            for (var n = new TaskCompletionCallback(t.rolls.length, function() { postProcessCompleteGroup(t, e), r() }, "groupCompleteCallback"), s = 0; s < t.rolls.length; s++) initiateSubGroupRolls(t.rolls[s], t.resultType, n) },
        initiateSubGroupRolls = function(t, e, r) {
            var n = new TaskCompletionCallback(t.length, function() { r.taskComplete() }, "subGroupCompleteCallback");
            initiateRolls(t, e, function() { n.taskComplete() }) },
        doRolls = function(t, e) { log(function() {
                return diceRollToString(t) + "	 - E doRolls" }), t.results = [];
            for (var r = new TaskCompletionCallback(t.dice, function() { diceRollCompleteCallback(t), e() }, "rollCompleteCallback"), n = function() { r.taskComplete() }, s = 0; s < t.dice; s++) rollDie(s, t, n);
            r.verify(), log(function() {
                return diceRollToString(t) + "	 - L doRolls" }) },
        diceRollCompleteCallback = function(t) {
            if (log(function() {
                    return diceRollToString(t) + "	 - E diceRollCompleteCallback" }), t.results.sort(function(t, e) {
                    var r = t.i - e.i;
                    return 0 != r || t.d == e.d ? r : t.d ? -1 : 1 }), t.results.forEach(function(t) { delete t.i }), t.mods && void 0 != t.mods.keep) {
                var e = "l" == t.mods.keep.end ? "a" : "d",
                    r = sortRolls(t.results, e);
                keepRolls(r, t.mods.keep.count) }
            if (t.mods && void 0 != t.mods.drop) {
                var e = "l" == t.mods.drop.end ? "a" : "d",
                    r = sortRolls(t.results, e);
                dropRolls(r, t.mods.drop.count) }
            t.mods && void 0 != t.mods.sort && (t.results = sortRolls(t.results, t.mods.sort.order)), log(function() {
                return diceRollToString(t) + "	 - L diceRollCompleteCallback" }) },
        postProcessCompleteGroup = function(t, e) {
            if (log(function() {
                    return "E postProcessCompleteGroup(" + e + ")" }), t.mods && void 0 != t.mods.keep && 1 == t.rolls.length) {
                var r = "l" == t.mods.keep.end ? "a" : "d",
                    n = buildSubGroupRollsArray(t.rolls[0]);
                n = sortRolls(n, r), keepRolls(n, t.mods.keep.count), cleanupSubGroupValues(t.rolls[0]) }
            if (t.mods && void 0 != t.mods.drop && 1 == t.rolls.length) {
                var r = "l" == t.mods.drop.end ? "a" : "d",
                    n = buildSubGroupRollsArray(t.rolls[0]);
                n = sortRolls(n, r), dropRolls(n, t.mods.drop.count), cleanupSubGroupValues(t.rolls[0]) }
            if (totalResult(t, e), t.mods && void 0 != t.mods.keep && t.rolls.length > 1) {
                var r = "l" == t.mods.keep.end ? "a" : "d",
                    s = sortRolls(t.results, r);
                keepRolls(s, t.mods.keep.count) }
            if (t.mods && void 0 != t.mods.drop && t.rolls.length > 1) {
                var r = "l" == t.mods.drop.end ? "a" : "d",
                    s = sortRolls(t.results, r);
                dropRolls(s, t.mods.drop.count) }
            log(function() {
                return "L postProcessCompleteGroup" }) },
        buildSubGroupRollsArray = function(t) {
            for (var e = [], r = 0; r < t.length; r++) t[r].type == d20.dice.TYPE_ROLL_EXPR ? e = e.concat(t[r].results) : t[r].type == d20.dice.TYPE_GROUP_EXPR && (t[r].v = totalResult(t[r], t[r].resultType).eval(), e.push(t[r]));
            return e },
        cleanupSubGroupValues = function(t) { t.forEach(function(t) { t.type == d20.dice.TYPE_GROUP_EXPR && delete t.v }) },
        keepRolls = function(t, e) {
            for (var r = 0, n = 0; n < t.length; n++) t[n].d || (e > r ? r++ : t[n].d = !0) },
        dropRolls = function(t, e) {
            for (var r = 0, n = 0; n < t.length && e > r; n++) t[n].d || (t[n].d = !0, r++) },
        sortRolls = function(t, e) {
            var r = "d" == e ? -1 : 1;
            return t.slice(0).sort(function(t, e) {
                return (t.v - e.v) * r }) },
        asyncRand = function(t, e, r, n) {
            if (0 === t) setTimeout(function() { e(0) }, 0);
            else {
                if ("undefined" == typeof Firebase && d20.tddice && d20.tddice.canRoll3D() && !r) return void d20.tddice.roller(t, e, n);
                if (6 === t && d20.textchat && d20.textchat.egg_clickhole && !$("#lightly-overlay").is(":visible")) {
                    var s = [
                            ["2990", 1, 4],
                            ["2991", 1, 7],
                            ["2992", 1, 12],
                            ["2993", 2, 7],
                            ["2994", 2, 5],
                            ["2995", 2, 38],
                            ["2996", 2, 11],
                            ["2997", 3, 13],
                            ["2998", 3, 16],
                            ["2999", 3, 6],
                            ["3000", 3, 16],
                            ["3001", 4, 17],
                            ["3002", 4, 18],
                            ["3003", 4, 16],
                            ["3004", 5, 7],
                            ["3006", 5, 24],
                            ["3005", 5, 14],
                            ["3007", 5, 27],
                            ["3008", 6, 7],
                            ["3009", 6, 6],
                            ["3010", 6, 5],
                            ["3012", 6, 10]
                        ],
                        o = s[othis.random(s.length)];
                    d20.textchat.sendShout({ type: "playclickhole", playerid: global.currentPlayer.id, content: o, time: (new Date).getTime() }), global.fakeLightly && global.fakeLightly("http://v.theonion.com/onionstudios/video/" + o[0] + "/640.mp4"), setTimeout(function() { e(o[1]), $("#lightly-overlay").hide() }, 1e3 * o[2] + 2e3) } else setTimeout(function() { e(othis.random(t) + 1) }, 0) } },
        compareToPoint = function(value, cp, defaultPoint) {
            if (void 0 != cp.comp) {
                var cpFormula = value + cp.comp + cp.point,
                    cpResult = eval(cpFormula);
                return cpResult }
            return value == defaultPoint },
        rollDie = function(t, e, r, n) {
            var s = new RollResult(t);
            e.results.push(s),
                function(t) { asyncRand(e.sides, function(s) { individualRollCallback(e, t, s, r, n) }, void 0 !== e.table, e.rollid) }(s) },
        individualRollCallback = function(t, e, r, n, s) {
            if (s = s || 0, log(function() {
                    return diceRollToString(t) + "	 - E individualRollCallback(" + s + ") " + r }), void 0 !== t.table ? (e.tableidx = r - 1, e.v += d20.getTableElementValue(t.table, e.tableidx)) : e.v += r, t.fate && (e.v -= 2), t.mods && void 0 != t.mods.penetrating && s > 0 && (e.v -= 1), s > MAX_NUM_ROLLS) n();
            else if (t.mods && void 0 != t.mods.exploding && compareToPoint(r, t.mods.exploding, t.sides)) rollDie(e.i, t, n, s + 1);
            else if (t.mods && void 0 != t.mods.compounding && compareToPoint(r, t.mods.compounding, t.sides)) asyncRand(t.sides, function(r) {
                individualRollCallback(t, e, r, n, s + 1)
            }, void 0 !== t.table, t.rollid);
            else if (t.mods && void 0 != t.mods.penetrating && compareToPoint(r, t.mods.penetrating, t.sides)) rollDie(e.i, t, n, s + 1);
            else if (t.mods && void 0 != t.mods.reroll) {
                var o = t.mods.reroll.some(function(o) {
                    if (o.maxrerolls)
                        for (var i = 0, l = 0; l < t.results.length; l++) t.results[l].i === e.i && t.results[l].d === !0 && i++;
                    return compareToPoint(r, o, 1) ? o.maxrerolls && i >= o.maxrerolls ? !1 : (e.d = !0, rollDie(e.i, t, n, s + 1), !0) : !1 });
                o || n() } else n();
            log(function() {
                return diceRollToString(t) + "	 - L individualRollCallback(" + s + ") " + r })
        },
        postProcessCompleteRolls = function(t, e, r) {
            if (log(function() {
                    return "E postProcessCompleteRolls" }), t.type == d20.dice.TYPE_VALIDATED_ROLLS) {
                var n = postProcessCompleteRolls(t.rolls, t.resultType);
                return t.total = n, n }
            var s = totalResults(t, e, r);
            return log(function() {
                return "L postProcessCompleteRolls - " + s }), s },
        totalResults = function(t, e, r, n) {
            for (var n = n || new ExpressionBuilder, n = new ExpressionBuilder, s = 0; s < t.length; s++) totalResult(t[s], e, r, n);
            return n.eval() },
        totalResult = function(t, e, r, n) {
            var n = n || new ExpressionBuilder;
            if (t.type == d20.dice.TYPE_ROLL_EXPR) { n.startGroup();
                for (var s = 0; s < t.results.length; s++) t.results[s].d || addResultValue(n, e, t.results[s].v, t);
                n.endGroup() } else if (t.type == d20.dice.TYPE_MATH_EXPR) n.addMathExpr(t.expr);
            else if (t.type == d20.dice.TYPE_GROUP_EXPR) {
                if (n.startGroup(), !t.d)
                    if (void 0 == t.results || r)
                        if (t.results = [], 1 == t.rolls.length && e == d20.dice.ROLL_TYPE_SUCCESS) {
                            for (var o = "", i = void 0, l = "", a = 0; a < t.rolls[0].length; a++)
                                if (t.rolls[0][a].type == d20.dice.TYPE_ROLL_EXPR) {
                                    if (void 0 != i) throw "Only one roll expression is allowed in a single sub-roll expression success check";
                                    i = t.rolls[0][a] } else if (t.rolls[0][a].type == d20.dice.TYPE_MATH_EXPR) void 0 == i ? o += t.rolls[0][a].expr : l += t.rolls[0][a].expr;
                            else if (t.rolls[0][a].type == d20.dice.TYPE_GROUP_EXPR) throw t.rolls[0][a].type + " expression is not supported in a single sub-roll expression success check";
                            for (var a = 0; a < i.results.length; a++)
                                if (!i.results[a].d) {
                                    var u = new ExpressionBuilder;
                                    u.startGroup(), u.addMathExpr(o), u.addGroupValue(i.results[a].v), u.addMathExpr(l), u.endGroup(), t.results.push(new GroupResult(u.eval())) } } else
                            for (var p = 0; p < t.rolls.length; p++) {
                                var c = totalResults(t.rolls[p], t.resultType, r);
                                t.results.push(new GroupResult(c)), addResultValue(n, e, c, t) } else t.results.forEach(function(r) { r.d || addResultValue(n, e, r.v, t) });
                n.endGroup() }
            return n },
        addResultValue = function(t, e, r, n) {
            if (e == d20.dice.ROLL_TYPE_SUM) t.addGroupValue(r);
            else {
                if (e != d20.dice.ROLL_TYPE_SUCCESS) throw "Unsupported resultType: " + e;
                t.addGroupSuccess(r, n.mods.success), n.mods && void 0 != n.mods.failure && t.addGroupFailure(r, n.mods.failure) } };
    this.reprocess = function(t, e, r) { r = r || fallbackErrorHandler;
        try { postProcessCompleteRolls(t, void 0, !0), e(t) } catch (n) { r(n) } };
    var remoteRollQueue = [],
        remoteRollCallbacks = {},
        performRemoteRoll = function(t, e, r, n, s) { remoteRollQueue.push({ vre: t, rollid: e, rolltype: r }), remoteRollCallbacks[e] = { success: n, error: s }, debounced_doRemoteRollRequest() },
        _doRemoteRollRequest = function() {
            if (0 !== remoteRollQueue.length)
                if (!global.is_playerapp && global.currentPlayer.get("tddiceenabled") && global.currentPlayer.get("disableagency") === !1) {
                    if ($("#tdagencyoverlay").is(":visible")) return;
                    $("#tdagencyoverlay").show(), numberofdice = remoteRollQueue[0].vre.rolls[0].dice ? remoteRollQueue[0].vre.rolls[0].dice : 1, d20.tddice.playsound("dicecup", numberofdice);
                    var t = {},
                        e = $("#tdagencyoverlay svg line"),
                        r = !1;
                    $("#tdagencyoverlay").on("mousedown", function(n) { t.startx = n.clientX / $(global).width(), t.starty = n.clientY / $(global).height(), e.attr("x1", n.clientX).attr("y1", n.clientY).attr("x2", n.clientX).attr("y2", n.clientY), r = !0 }), $("#tdagencyoverlay").on("mousemove", function(n) {
                        if (r) { xdist = Math.abs(t.startx - n.clientX / $(global).width()), ydist = Math.abs(t.starty - n.clientY / $(global).height());
                            var s = Math.sqrt(xdist * xdist + ydist * ydist);
                            .2 > s ? e.css("stroke", "rgb(255,255,255)") : .5 > s ? e.css("stroke", "rgb(245,238,44)") : e.css("stroke", "rgb(245,44,44)"), e.attr("x2", n.clientX).attr("y2", n.clientY) } }), $("#tdagencyoverlay").on("mouseup", function(r) { $("#tdagencyoverlay").off().hide(), e.attr("x1", 0).attr("y1", 0).attr("x2", 0).attr("y2", 0), t.startx ? (t.stopx = r.clientX / $(global).width(), t.stopy = r.clientY / $(global).height(), _posthookrollrequest(t)) : _posthookrollrequest() }) } else setTimeout(function() { _posthookrollrequest() }, 50) },
        _posthookrollrequest = function(t) {
            if (0 !== remoteRollQueue.length) {
                var e = { cid: global.campaign_storage_path, fbnum: global.FIREBASE_ROOT, authkey: global.GNTKN, pid: global.currentPlayer.id, rolls: remoteRollQueue, use3d: global.currentPlayer.get(global.is_playerapp ? "apptddiceenabled" : "tddiceenabled") };
                if (t) {
                    var r = { x: t.startx - t.stopx, y: t.starty - t.stopy };
                    mindistance = .01, maxdistance = .3, Math.abs(r.x) < mindistance && (r.x = r.x < 0 ? -mindistance : mindistance), Math.abs(r.y) < mindistance && (r.y = r.y < 0 ? -mindistance : mindistance), Math.abs(r.x) > maxdistance && (r.x = r.x < 0 ? -maxdistance : maxdistance), Math.abs(r.y) > maxdistance && (r.y = r.y < 0 ? -maxdistance : maxdistance), e.deltas = { x: 80 * r.x * -1, y: 80 * r.y * 1 } } else e.use3d === !0 && (e.deltas = { x: 10 * Math.random() - 5, y: 20 });
                $.ajax({ url: "https://app.roll20.net/doroll", type: "POST", data: JSON.stringify(e), contentType: "application/json; charset=utf-8", dataType: "json", success: function(t) {
                        var e = t;
                        for (var r in e)
                            if (void 0 == e[r].error) {
                                var n = JSON.parse(e[r].json);
                                postProcessCompleteRolls(n), remoteRollCallbacks[r].success(n, r, e[r].signature, e[r].tdseed), d20.tutorial && void 0 !== e[r].shoutjson && d20.tddice.remoteRoll(JSON.parse(e[r].shoutjson)) } else remoteRollCallbacks[r].error("There was an error fetching your roll. " + e[r].error) }, error: function() { console.log("Error fetching from QuantumRoll, fallback to local rolls."), _.each(e.rolls, function(t) {
                            var e = t.vre,
                                r = new TaskCompletionCallback(e.rolls.length, function() { postProcessCompleteRolls(e), setTimeout(function() { remoteRollCallbacks[t.rollid].success(e, null, !1) }, 0) }, "wholeRollCompleteCallback");
                            initiateRolls(e.rolls, e.resultType, function() { r.taskComplete() }) }) } }), remoteRollQueue = [] } };
    this.flushRemoteQueue = function() { _doRemoteRollRequest() };
    var debounced_doRemoteRollRequest = _.debounce(_doRemoteRollRequest, 100);
    return this.process = function(t, e, r) { r = r || fallbackErrorHandler;
        try {
            var n = parseRollString(t);
            if (0 == n.rolls) throw "There were no dice to roll!";
            var s = !1,
                o = !1,
                i = 0,
                l = function(t) {
                    if (i++, void 0 !== t)
                        for (var e = 0; e < t.length; e++)
                            if (void 0 !== t[e].table && (s = !0), "R" === t[e].type && (o = !0), (!s || !o) && 99 > i && void 0 !== t[e].rolls && t[e].rolls.length > 0)
                                for (var r = 0; r < t[e].rolls.length; r++) l(t[e].rolls[r]) };
            try { l(n.rolls) } catch (a) { console.log("Error while checking for table existence. Ignoring.") }
            if (l = null, d20.textchat && d20.textchat.egg_clickhole && (s = !0), "undefined" == typeof Firebase || s === !0 || o === !1) {
                var u = new TaskCompletionCallback(n.rolls.length, function() { postProcessCompleteRolls(n), setTimeout(function() { e(n, null, !1) }, 0) }, "wholeRollCompleteCallback");
                initiateRolls(n.rolls, n.resultType, function() { u.taskComplete() }) } else if ("undefined" == typeof $) {
                var p = generateUUID(),
                    c = { vre: n, cid: CAMPAIGNID, fbnum: "https://" + FIREBASENUM + ".firebaseio.com/", pid: "api", rid: p, use3d: !1, authkey: FIREBASETOKEN, rolltype: d20.textchat.currentRollType };
                request.post({ url: "https://app.roll20.net/doroll", body: c, json: !0, timeout: 5e3 }, function(t, n, s) {
                    if (t || 200 != n.statusCode || "" === s) r("There was an error communicating with the QuantumRoll server.");
                    else {
                        var o = s;
                        if (void 0 !== o.error) return void r("There was an error fetching your roll. " + o.error);
                        var i = JSON.parse(o.json);
                        postProcessCompleteRolls(i), e(i, p, o.signature) } }) } else {
                var p = generateUUID();
                performRemoteRoll(n, p, d20.textchat.currentRollType, e, r) } } catch (a) { r(a) } }, this.handleRollReq = function(t, e) {
        var r = new TaskCompletionCallback(t.rolls.length, function() {
            try { postProcessCompleteRolls(t) } catch (r) {
                return void e({ error: "There was an error processing this roll." }) }
            setTimeout(function() { e(t) }, 0) }, "wholeRollCompleteCallback");
        try { initiateRolls(t.rolls, t.resultType, function() { r.taskComplete() }) } catch (n) { e({ error: "There was an error processing this roll." }) } }, this.handleRollString = function(t) {
        var e = parseRollString(t);
        if (0 == e.rolls) throw "There were no dice to roll!";
        return e }, this
};
