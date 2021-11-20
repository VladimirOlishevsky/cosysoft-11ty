(() => {
  // node_modules/rough-notation/lib/rough-notation.esm.js
  var t = "http://www.w3.org/2000/svg";
  var e = class {
    constructor(t2) {
      this.seed = t2;
    }
    next() {
      return this.seed ? (2 ** 31 - 1 & (this.seed = Math.imul(48271, this.seed))) / 2 ** 31 : Math.random();
    }
  };
  function s(t2, e2, s2, i2, n2) {
    return { type: "path", ops: c(t2, e2, s2, i2, n2) };
  }
  function i(t2, e2, i2) {
    const n2 = (t2 || []).length;
    if (n2 > 2) {
      const s2 = [];
      for (let e3 = 0; e3 < n2 - 1; e3++)
        s2.push(...c(t2[e3][0], t2[e3][1], t2[e3 + 1][0], t2[e3 + 1][1], i2));
      return e2 && s2.push(...c(t2[n2 - 1][0], t2[n2 - 1][1], t2[0][0], t2[0][1], i2)), { type: "path", ops: s2 };
    }
    return n2 === 2 ? s(t2[0][0], t2[0][1], t2[1][0], t2[1][1], i2) : { type: "path", ops: [] };
  }
  function n(t2, e2, s2, n2, o2) {
    return function(t3, e3) {
      return i(t3, true, e3);
    }([[t2, e2], [t2 + s2, e2], [t2 + s2, e2 + n2], [t2, e2 + n2]], o2);
  }
  function o(t2, e2, s2, i2, n2) {
    return function(t3, e3, s3, i3) {
      const [n3, o2] = l(i3.increment, t3, e3, i3.rx, i3.ry, 1, i3.increment * h(0.1, h(0.4, 1, s3), s3), s3);
      let r2 = f(n3, null, s3);
      if (!s3.disableMultiStroke) {
        const [n4] = l(i3.increment, t3, e3, i3.rx, i3.ry, 1.5, 0, s3), o3 = f(n4, null, s3);
        r2 = r2.concat(o3);
      }
      return { estimatedPoints: o2, opset: { type: "path", ops: r2 } };
    }(t2, e2, n2, function(t3, e3, s3) {
      const i3 = Math.sqrt(2 * Math.PI * Math.sqrt((Math.pow(t3 / 2, 2) + Math.pow(e3 / 2, 2)) / 2)), n3 = Math.max(s3.curveStepCount, s3.curveStepCount / Math.sqrt(200) * i3), o2 = 2 * Math.PI / n3;
      let r2 = Math.abs(t3 / 2), h2 = Math.abs(e3 / 2);
      const c2 = 1 - s3.curveFitting;
      return r2 += a(r2 * c2, s3), h2 += a(h2 * c2, s3), { increment: o2, rx: r2, ry: h2 };
    }(s2, i2, n2)).opset;
  }
  function r(t2) {
    return t2.randomizer || (t2.randomizer = new e(t2.seed || 0)), t2.randomizer.next();
  }
  function h(t2, e2, s2, i2 = 1) {
    return s2.roughness * i2 * (r(s2) * (e2 - t2) + t2);
  }
  function a(t2, e2, s2 = 1) {
    return h(-t2, t2, e2, s2);
  }
  function c(t2, e2, s2, i2, n2, o2 = false) {
    const r2 = o2 ? n2.disableMultiStrokeFill : n2.disableMultiStroke, h2 = u(t2, e2, s2, i2, n2, true, false);
    if (r2)
      return h2;
    const a2 = u(t2, e2, s2, i2, n2, true, true);
    return h2.concat(a2);
  }
  function u(t2, e2, s2, i2, n2, o2, h2) {
    const c2 = Math.pow(t2 - s2, 2) + Math.pow(e2 - i2, 2), u2 = Math.sqrt(c2);
    let f2 = 1;
    f2 = u2 < 200 ? 1 : u2 > 500 ? 0.4 : -16668e-7 * u2 + 1.233334;
    let l2 = n2.maxRandomnessOffset || 0;
    l2 * l2 * 100 > c2 && (l2 = u2 / 10);
    const g2 = l2 / 2, d2 = 0.2 + 0.2 * r(n2);
    let p2 = n2.bowing * n2.maxRandomnessOffset * (i2 - e2) / 200, _2 = n2.bowing * n2.maxRandomnessOffset * (t2 - s2) / 200;
    p2 = a(p2, n2, f2), _2 = a(_2, n2, f2);
    const m = [], w = () => a(g2, n2, f2), v = () => a(l2, n2, f2);
    return o2 && (h2 ? m.push({ op: "move", data: [t2 + w(), e2 + w()] }) : m.push({ op: "move", data: [t2 + a(l2, n2, f2), e2 + a(l2, n2, f2)] })), h2 ? m.push({ op: "bcurveTo", data: [p2 + t2 + (s2 - t2) * d2 + w(), _2 + e2 + (i2 - e2) * d2 + w(), p2 + t2 + 2 * (s2 - t2) * d2 + w(), _2 + e2 + 2 * (i2 - e2) * d2 + w(), s2 + w(), i2 + w()] }) : m.push({ op: "bcurveTo", data: [p2 + t2 + (s2 - t2) * d2 + v(), _2 + e2 + (i2 - e2) * d2 + v(), p2 + t2 + 2 * (s2 - t2) * d2 + v(), _2 + e2 + 2 * (i2 - e2) * d2 + v(), s2 + v(), i2 + v()] }), m;
  }
  function f(t2, e2, s2) {
    const i2 = t2.length, n2 = [];
    if (i2 > 3) {
      const o2 = [], r2 = 1 - s2.curveTightness;
      n2.push({ op: "move", data: [t2[1][0], t2[1][1]] });
      for (let e3 = 1; e3 + 2 < i2; e3++) {
        const s3 = t2[e3];
        o2[0] = [s3[0], s3[1]], o2[1] = [s3[0] + (r2 * t2[e3 + 1][0] - r2 * t2[e3 - 1][0]) / 6, s3[1] + (r2 * t2[e3 + 1][1] - r2 * t2[e3 - 1][1]) / 6], o2[2] = [t2[e3 + 1][0] + (r2 * t2[e3][0] - r2 * t2[e3 + 2][0]) / 6, t2[e3 + 1][1] + (r2 * t2[e3][1] - r2 * t2[e3 + 2][1]) / 6], o2[3] = [t2[e3 + 1][0], t2[e3 + 1][1]], n2.push({ op: "bcurveTo", data: [o2[1][0], o2[1][1], o2[2][0], o2[2][1], o2[3][0], o2[3][1]] });
      }
      if (e2 && e2.length === 2) {
        const t3 = s2.maxRandomnessOffset;
        n2.push({ op: "lineTo", data: [e2[0] + a(t3, s2), e2[1] + a(t3, s2)] });
      }
    } else
      i2 === 3 ? (n2.push({ op: "move", data: [t2[1][0], t2[1][1]] }), n2.push({ op: "bcurveTo", data: [t2[1][0], t2[1][1], t2[2][0], t2[2][1], t2[2][0], t2[2][1]] })) : i2 === 2 && n2.push(...c(t2[0][0], t2[0][1], t2[1][0], t2[1][1], s2));
    return n2;
  }
  function l(t2, e2, s2, i2, n2, o2, r2, h2) {
    const c2 = [], u2 = [], f2 = a(0.5, h2) - Math.PI / 2;
    u2.push([a(o2, h2) + e2 + 0.9 * i2 * Math.cos(f2 - t2), a(o2, h2) + s2 + 0.9 * n2 * Math.sin(f2 - t2)]);
    for (let r3 = f2; r3 < 2 * Math.PI + f2 - 0.01; r3 += t2) {
      const t3 = [a(o2, h2) + e2 + i2 * Math.cos(r3), a(o2, h2) + s2 + n2 * Math.sin(r3)];
      c2.push(t3), u2.push(t3);
    }
    return u2.push([a(o2, h2) + e2 + i2 * Math.cos(f2 + 2 * Math.PI + 0.5 * r2), a(o2, h2) + s2 + n2 * Math.sin(f2 + 2 * Math.PI + 0.5 * r2)]), u2.push([a(o2, h2) + e2 + 0.98 * i2 * Math.cos(f2 + r2), a(o2, h2) + s2 + 0.98 * n2 * Math.sin(f2 + r2)]), u2.push([a(o2, h2) + e2 + 0.9 * i2 * Math.cos(f2 + 0.5 * r2), a(o2, h2) + s2 + 0.9 * n2 * Math.sin(f2 + 0.5 * r2)]), [u2, c2];
  }
  function g(t2, e2) {
    return { maxRandomnessOffset: 2, roughness: t2 === "highlight" ? 3 : 1.5, bowing: 1, stroke: "#000", strokeWidth: 1.5, curveTightness: 0, curveFitting: 0.95, curveStepCount: 9, fillStyle: "hachure", fillWeight: -1, hachureAngle: -41, hachureGap: -1, dashOffset: -1, dashGap: -1, zigzagOffset: -1, combineNestedSvgPaths: false, disableMultiStroke: t2 !== "double", disableMultiStrokeFill: false, seed: e2 };
  }
  function d(e2, r2, h2, a2, c2, u2) {
    const f2 = [];
    let l2 = h2.strokeWidth || 2;
    const d2 = function(t2) {
      const e3 = t2.padding;
      if (e3 || e3 === 0) {
        if (typeof e3 == "number")
          return [e3, e3, e3, e3];
        if (Array.isArray(e3)) {
          const t3 = e3;
          if (t3.length)
            switch (t3.length) {
              case 4:
                return [...t3];
              case 1:
                return [t3[0], t3[0], t3[0], t3[0]];
              case 2:
                return [...t3, ...t3];
              case 3:
                return [...t3, t3[1]];
              default:
                return [t3[0], t3[1], t3[2], t3[3]];
            }
        }
      }
      return [5, 5, 5, 5];
    }(h2), p2 = h2.animate === void 0 || !!h2.animate, _2 = h2.iterations || 2, m = h2.rtl ? 1 : 0, w = g("single", u2);
    switch (h2.type) {
      case "underline": {
        const t2 = r2.y + r2.h + d2[2];
        for (let e3 = m; e3 < _2 + m; e3++)
          e3 % 2 ? f2.push(s(r2.x + r2.w, t2, r2.x, t2, w)) : f2.push(s(r2.x, t2, r2.x + r2.w, t2, w));
        break;
      }
      case "strike-through": {
        const t2 = r2.y + r2.h / 2;
        for (let e3 = m; e3 < _2 + m; e3++)
          e3 % 2 ? f2.push(s(r2.x + r2.w, t2, r2.x, t2, w)) : f2.push(s(r2.x, t2, r2.x + r2.w, t2, w));
        break;
      }
      case "box": {
        const t2 = r2.x - d2[3], e3 = r2.y - d2[0], s2 = r2.w + (d2[1] + d2[3]), i2 = r2.h + (d2[0] + d2[2]);
        for (let o2 = 0; o2 < _2; o2++)
          f2.push(n(t2, e3, s2, i2, w));
        break;
      }
      case "bracket": {
        const t2 = Array.isArray(h2.brackets) ? h2.brackets : h2.brackets ? [h2.brackets] : ["right"], e3 = r2.x - 2 * d2[3], s2 = r2.x + r2.w + 2 * d2[1], n2 = r2.y - 2 * d2[0], o2 = r2.y + r2.h + 2 * d2[2];
        for (const h3 of t2) {
          let t3;
          switch (h3) {
            case "bottom":
              t3 = [[e3, r2.y + r2.h], [e3, o2], [s2, o2], [s2, r2.y + r2.h]];
              break;
            case "top":
              t3 = [[e3, r2.y], [e3, n2], [s2, n2], [s2, r2.y]];
              break;
            case "left":
              t3 = [[r2.x, n2], [e3, n2], [e3, o2], [r2.x, o2]];
              break;
            case "right":
              t3 = [[r2.x + r2.w, n2], [s2, n2], [s2, o2], [r2.x + r2.w, o2]];
          }
          t3 && f2.push(i(t3, false, w));
        }
        break;
      }
      case "crossed-off": {
        const t2 = r2.x, e3 = r2.y, i2 = t2 + r2.w, n2 = e3 + r2.h;
        for (let o2 = m; o2 < _2 + m; o2++)
          o2 % 2 ? f2.push(s(i2, n2, t2, e3, w)) : f2.push(s(t2, e3, i2, n2, w));
        for (let o2 = m; o2 < _2 + m; o2++)
          o2 % 2 ? f2.push(s(t2, n2, i2, e3, w)) : f2.push(s(i2, e3, t2, n2, w));
        break;
      }
      case "circle": {
        const t2 = g("double", u2), e3 = r2.w + (d2[1] + d2[3]), s2 = r2.h + (d2[0] + d2[2]), i2 = r2.x - d2[3] + e3 / 2, n2 = r2.y - d2[0] + s2 / 2, h3 = Math.floor(_2 / 2), a3 = _2 - 2 * h3;
        for (let r3 = 0; r3 < h3; r3++)
          f2.push(o(i2, n2, e3, s2, t2));
        for (let t3 = 0; t3 < a3; t3++)
          f2.push(o(i2, n2, e3, s2, w));
        break;
      }
      case "highlight": {
        const t2 = g("highlight", u2);
        l2 = 0.95 * r2.h;
        const e3 = r2.y + r2.h / 2;
        for (let i2 = m; i2 < _2 + m; i2++)
          i2 % 2 ? f2.push(s(r2.x + r2.w, e3, r2.x, e3, t2)) : f2.push(s(r2.x, e3, r2.x + r2.w, e3, t2));
        break;
      }
    }
    if (f2.length) {
      const s2 = function(t2) {
        const e3 = [];
        for (const s3 of t2) {
          let t3 = "";
          for (const i3 of s3.ops) {
            const s4 = i3.data;
            switch (i3.op) {
              case "move":
                t3.trim() && e3.push(t3.trim()), t3 = `M${s4[0]} ${s4[1]} `;
                break;
              case "bcurveTo":
                t3 += `C${s4[0]} ${s4[1]}, ${s4[2]} ${s4[3]}, ${s4[4]} ${s4[5]} `;
                break;
              case "lineTo":
                t3 += `L${s4[0]} ${s4[1]} `;
            }
          }
          t3.trim() && e3.push(t3.trim());
        }
        return e3;
      }(f2), i2 = [], n2 = [];
      let o2 = 0;
      const r3 = (t2, e3, s3) => t2.setAttribute(e3, s3);
      for (const a3 of s2) {
        const s3 = document.createElementNS(t, "path");
        if (r3(s3, "d", a3), r3(s3, "fill", "none"), r3(s3, "stroke", h2.color || "currentColor"), r3(s3, "stroke-width", "" + l2), p2) {
          const t2 = s3.getTotalLength();
          i2.push(t2), o2 += t2;
        }
        e2.appendChild(s3), n2.push(s3);
      }
      if (p2) {
        let t2 = 0;
        for (let e3 = 0; e3 < n2.length; e3++) {
          const s3 = n2[e3], r4 = i2[e3], h3 = o2 ? c2 * (r4 / o2) : 0, u3 = a2 + t2, f3 = s3.style;
          f3.strokeDashoffset = "" + r4, f3.strokeDasharray = "" + r4, f3.animation = `rough-notation-dash ${h3}ms ease-out ${u3}ms forwards`, t2 += h3;
        }
      }
    }
  }
  var p = class {
    constructor(t2, e2) {
      this._state = "unattached", this._resizing = false, this._seed = Math.floor(Math.random() * 2 ** 31), this._lastSizes = [], this._animationDelay = 0, this._resizeListener = () => {
        this._resizing || (this._resizing = true, setTimeout(() => {
          this._resizing = false, this._state === "showing" && this.haveRectsChanged() && this.show();
        }, 400));
      }, this._e = t2, this._config = JSON.parse(JSON.stringify(e2)), this.attach();
    }
    get animate() {
      return this._config.animate;
    }
    set animate(t2) {
      this._config.animate = t2;
    }
    get animationDuration() {
      return this._config.animationDuration;
    }
    set animationDuration(t2) {
      this._config.animationDuration = t2;
    }
    get iterations() {
      return this._config.iterations;
    }
    set iterations(t2) {
      this._config.iterations = t2;
    }
    get color() {
      return this._config.color;
    }
    set color(t2) {
      this._config.color !== t2 && (this._config.color = t2, this.refresh());
    }
    get strokeWidth() {
      return this._config.strokeWidth;
    }
    set strokeWidth(t2) {
      this._config.strokeWidth !== t2 && (this._config.strokeWidth = t2, this.refresh());
    }
    get padding() {
      return this._config.padding;
    }
    set padding(t2) {
      this._config.padding !== t2 && (this._config.padding = t2, this.refresh());
    }
    attach() {
      if (this._state === "unattached" && this._e.parentElement) {
        !function() {
          if (!window.__rno_kf_s) {
            const t2 = window.__rno_kf_s = document.createElement("style");
            t2.textContent = "@keyframes rough-notation-dash { to { stroke-dashoffset: 0; } }", document.head.appendChild(t2);
          }
        }();
        const e2 = this._svg = document.createElementNS(t, "svg");
        e2.setAttribute("class", "rough-annotation");
        const s2 = e2.style;
        s2.position = "absolute", s2.top = "0", s2.left = "0", s2.overflow = "visible", s2.pointerEvents = "none", s2.width = "100px", s2.height = "100px";
        const i2 = this._config.type === "highlight";
        if (this._e.insertAdjacentElement(i2 ? "beforebegin" : "afterend", e2), this._state = "not-showing", i2) {
          const t2 = window.getComputedStyle(this._e).position;
          (!t2 || t2 === "static") && (this._e.style.position = "relative");
        }
        this.attachListeners();
      }
    }
    detachListeners() {
      window.removeEventListener("resize", this._resizeListener), this._ro && this._ro.unobserve(this._e);
    }
    attachListeners() {
      this.detachListeners(), window.addEventListener("resize", this._resizeListener, { passive: true }), !this._ro && "ResizeObserver" in window && (this._ro = new window.ResizeObserver((t2) => {
        for (const e2 of t2)
          e2.contentRect && this._resizeListener();
      })), this._ro && this._ro.observe(this._e);
    }
    haveRectsChanged() {
      if (this._lastSizes.length) {
        const t2 = this.rects();
        if (t2.length !== this._lastSizes.length)
          return true;
        for (let e2 = 0; e2 < t2.length; e2++)
          if (!this.isSameRect(t2[e2], this._lastSizes[e2]))
            return true;
      }
      return false;
    }
    isSameRect(t2, e2) {
      const s2 = (t3, e3) => Math.round(t3) === Math.round(e3);
      return s2(t2.x, e2.x) && s2(t2.y, e2.y) && s2(t2.w, e2.w) && s2(t2.h, e2.h);
    }
    isShowing() {
      return this._state !== "not-showing";
    }
    refresh() {
      this.isShowing() && !this.pendingRefresh && (this.pendingRefresh = Promise.resolve().then(() => {
        this.isShowing() && this.show(), delete this.pendingRefresh;
      }));
    }
    show() {
      switch (this._state) {
        case "unattached":
          break;
        case "showing":
          this.hide(), this._svg && this.render(this._svg, true);
          break;
        case "not-showing":
          this.attach(), this._svg && this.render(this._svg, false);
      }
    }
    hide() {
      if (this._svg)
        for (; this._svg.lastChild; )
          this._svg.removeChild(this._svg.lastChild);
      this._state = "not-showing";
    }
    remove() {
      this._svg && this._svg.parentElement && this._svg.parentElement.removeChild(this._svg), this._svg = void 0, this._state = "unattached", this.detachListeners();
    }
    render(t2, e2) {
      let s2 = this._config;
      e2 && (s2 = JSON.parse(JSON.stringify(this._config)), s2.animate = false);
      const i2 = this.rects();
      let n2 = 0;
      i2.forEach((t3) => n2 += t3.w);
      const o2 = s2.animationDuration || 800;
      let r2 = 0;
      for (let e3 = 0; e3 < i2.length; e3++) {
        const h2 = o2 * (i2[e3].w / n2);
        d(t2, i2[e3], s2, r2 + this._animationDelay, h2, this._seed), r2 += h2;
      }
      this._lastSizes = i2, this._state = "showing";
    }
    rects() {
      const t2 = [];
      if (this._svg)
        if (this._config.multiline) {
          const e2 = this._e.getClientRects();
          for (let s2 = 0; s2 < e2.length; s2++)
            t2.push(this.svgRect(this._svg, e2[s2]));
        } else
          t2.push(this.svgRect(this._svg, this._e.getBoundingClientRect()));
      return t2;
    }
    svgRect(t2, e2) {
      const s2 = t2.getBoundingClientRect(), i2 = e2;
      return { x: (i2.x || i2.left) - (s2.x || s2.left), y: (i2.y || i2.top) - (s2.y || s2.top), w: i2.width, h: i2.height };
    }
  };
  function _(t2, e2) {
    return new p(t2, e2);
  }

  // src/_includes/assets/js/main.js
  var engineer = document.querySelector("#frontend-engineer");
  if (engineer) {
    const annotation = _(engineer, {
      type: "highlight",
      color: "#A2E8FA",
      multiline: true
    });
    annotation.show();
  }
  console.log("hello");
})();