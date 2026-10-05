// Origami medieval cast: folded-paper facets and patterned papers, in the
// spirit of oak.id's paper animals. Every figure is drawn in a 240 x 340 box
// (the rider in 400 x 420) with its feet on y = 331, facing right. Parts
// marked .o-part unfold along data-fold; idle motion lives in
// styles/origami.scss.
import { Emblem } from "./heraldry";
import { path } from "./path";

// armoured knight with spear, pennant and a heater shield bearing the lock
const Knight = ({ transform, flip }) => (
  <g className="o-knight" transform={transform}>
    <ellipse className="o-shadow" cx="124" cy="331" rx="78" ry="7" />
    {/* cape: pleated paper with a zigzag hem */}
    <g className="o-part" data-fold="down">
      <g className="o-cape">
        <path className="o-violet-l" d="M100 118 116 118 84 300 56 314Z" />
        <path className="o-violet-d" d="M116 118 132 118 110 322 84 300Z" />
        <path className="o-violet-m" d="M132 118 146 118 146 306 110 322Z" />
        <path className="o-violet-d" d="M146 118 158 120 178 322 146 306Z" />
        <path className="o-violet-m" d="M158 120 168 124 204 308 178 322Z" />
        <path
          className="o-crease"
          d="M116 118 84 300 M132 118 110 322 M146 118 146 306 M158 120 178 322"
        />
      </g>
    </g>
    {/* legs with knee plates */}
    <g className="o-part o-legs" data-fold="up">
      <path className="o-steel-l" d="M104 244 117 244 115 280 103 280Z" />
      <path className="o-steel-d" d="M117 244 126 244 124 280 115 280Z" />
      <path className="o-steel-l" d="M102 280 114 272 116 286 104 290Z" />
      <path className="o-steel-m" d="M114 272 125 280 124 290 116 286Z" />
      <path className="o-steel-l" d="M104 290 116 286 113 316 100 316Z" />
      <path className="o-steel-d" d="M116 286 124 290 122 316 113 316Z" />
      <path className="o-steel-m" d="M134 244 145 244 145 280 135 280Z" />
      <path className="o-steel-x" d="M145 244 156 244 156 280 145 280Z" />
      <path className="o-steel-m" d="M134 280 145 273 146 288 136 290Z" />
      <path className="o-steel-d" d="M145 273 156 280 156 290 146 288Z" />
      <path className="o-steel-m" d="M136 290 146 288 146 316 137 316Z" />
      <path className="o-steel-x" d="M146 288 156 290 157 316 146 316Z" />
      <path className="o-steel-l" d="M100 314 113 314 104 322 78 331Z" />
      <path
        className="o-steel-d"
        d="M113 314 122 316 123 331 78 331 104 322Z"
      />
      <path className="o-steel-m" d="M137 314 150 314 140 322 124 331Z" />
      <path
        className="o-steel-x"
        d="M150 314 157 316 158 331 124 331 140 322Z"
      />
    </g>
    {/* surcoat with a folded waist */}
    <g className="o-part" data-fold="down">
      <g className="o-body">
        <path className="o-zebra" d="M104 124 133 124 130 194 99 194Z" />
        <path className="o-zebra" d="M133 124 160 124 162 194 130 194Z" />
        <path className="o-zebra" d="M99 200 130 200 126 256 91 256Z" />
        <path className="o-zebra" d="M130 200 163 200 168 256 126 256Z" />
        <path className="o-lift" d="M104 124 133 124 130 194 99 194Z" />
        <path className="o-shade" d="M133 124 160 124 162 194 130 194Z" />
        <path className="o-shade2" d="M130 200 163 200 168 256 126 256Z" />
        <path className="o-gold-l" d="M99 190 130 190 130 201 98 201Z" />
        <path className="o-gold-d" d="M130 190 162 190 163 201 130 201Z" />
        <path className="o-gold-m" d="M124 188 136 188 136 203 124 203Z" />
        <path
          className="o-coral-m"
          d="M112 150 131 137 150 150 150 161 131 148 112 161Z"
        />
        <path className="o-coral-d" d="M131 137 150 150 150 161 131 148Z" />
        <path className="o-crease" d="M133 124 130 194 M130 200 126 256" />
      </g>
    </g>
    {/* spear */}
    <g className="o-part o-spear" data-fold="up">
      <path className="o-wood-l" d="M66 32 70 32 71 330 67 330Z" />
      <path className="o-wood-d" d="M70 32 74 32 75 330 71 330Z" />
      <path className="o-steel-l" d="M70 0 59 23 70 42Z" />
      <path className="o-steel-d" d="M70 0 81 23 70 42Z" />
      <path className="o-gold-l" d="M63 38 70 38 70 45 63 45Z" />
      <path className="o-gold-d" d="M70 38 77 38 77 45 70 45Z" />
    </g>
    {/* pennant: swallowtail flag, folded once */}
    <g className="o-part o-pennant" data-fold="left">
      <g className="o-wave">
        <path className="o-violet-l" d="M66 48 12 54 32 64 66 64Z" />
        <path className="o-violet-d" d="M66 64 32 64 16 76 66 80Z" />
        <path className="o-coral-m" d="M47 57 55 52 63 57 55 62Z" />
        <path className="o-coral-d" d="M55 62 63 57 63 66 55 71 47 66 47 57Z" />
      </g>
    </g>
    {/* front arm, bent, gripping the spear */}
    <g className="o-part o-arm" data-fold="left">
      <path className="o-scales" d="M104 124 121 132 104 164 90 158Z" />
      <path className="o-scales" d="M121 132 118 166 104 164Z" />
      <path className="o-shade" d="M121 132 118 166 104 164Z" />
      <path className="o-steel-l" d="M90 158 104 164 94 188 80 184Z" />
      <path className="o-steel-d" d="M104 164 102 190 94 188Z" />
      <path className="o-steel-l" d="M95 114 124 114 115 142 92 136Z" />
      <path className="o-steel-d" d="M124 114 127 128 115 142Z" />
    </g>
    {/* great helm (no face reinforcement) and plume */}
    <g className="o-part o-head" data-fold="up">
      <g className="o-look">
        <g className="o-plume">
          <path className="o-coral-l" d="M128 56 138 36 160 30 149 50Z" />
          <path className="o-coral-d" d="M149 50 160 30 194 20 172 44Z" />
          <path className="o-coral-m" d="M138 36 152 20 194 20 160 30Z" />
          <path className="o-coral-l" d="M152 20 174 12 194 20Z" />
        </g>
        <path
          className="o-steel-l"
          d="M110 60 129 53 129 112 105 112 107 66Z"
        />
        <path className="o-steel-m" d="M129 53 144 57 146 112 129 112Z" />
        <path className="o-steel-d" d="M144 57 151 64 153 112 146 112Z" />
        <path className="o-lift" d="M110 60 129 53 129 64 108 68Z" />
        <path className="o-ink" d="M105 80 140 80 140 85 105 86Z" />
        <circle className="o-ink" cx="113" cy="96" r="1.4" />
        <circle className="o-ink" cx="119" cy="96" r="1.4" />
        <circle className="o-ink" cx="113" cy="102" r="1.4" />
        <circle className="o-ink" cx="119" cy="102" r="1.4" />
        <path className="o-steel-m" d="M108 112 150 112 155 124 104 124Z" />
        <path className="o-steel-d" d="M129 112 150 112 155 124 129 124Z" />
        <path className="o-crease" d="M129 53 129 112 M144 57 146 112" />
      </g>
    </g>
    {/* heater shield with the BMDRM lock */}
    <g className="o-part o-shield" data-fold="down">
      <path
        className="o-gold-l"
        d="M128 146 163 146 163 264 146 236 133 208 128 178Z"
      />
      <path
        className="o-gold-d"
        d="M163 146 198 146 198 178 193 208 180 236 163 264Z"
      />
      <path
        className="o-violet-l"
        d="M134 152 163 152 163 252 150 230 139 206 134 180Z"
      />
      <path
        className="o-violet-d"
        d="M163 152 192 152 192 180 187 206 176 230 163 252Z"
      />
      <Emblem flip={flip} x={149} y={172} scale={0.33} />
      <path className="o-crease" d="M163 146 163 264" />
    </g>
    {/* gauntlet wrapped around the shaft */}
    <g className="o-part o-hand" data-fold="left">
      <path className="o-steel-l" d="M62 184 82 182 82 194 62 196Z" />
      <path className="o-steel-d" d="M62 196 82 194 80 204 64 206Z" />
    </g>
  </g>
);

// hooded ranger in the house colours: deep violet cloak, harlequin tunic,
// kraft longbow with an arrow nocked (drawn now and then, never loosed)
const Archer = ({ transform }) => (
  <g className="o-archer" transform={transform}>
    <ellipse className="o-shadow" cx="126" cy="331" rx="78" ry="7" />
    {/* quiver across the back, fletchings over the shoulder */}
    <g className="o-part o-quiver" data-fold="up">
      <path className="o-shaft" d="M80 92 62 56 M88 88 76 50 M96 86 92 48" />
      <path className="o-coral-m" d="M62 56 55 45 63 42 67 53Z" />
      <path className="o-paper-l" d="M76 50 72 38 80 36 82 48Z" />
      <path className="o-violet-l" d="M92 48 90 36 98 37 97 48Z" />
      <path className="o-violet-d" d="M72 92 90 84 124 178 108 184Z" />
      <path className="o-violet-x" d="M90 84 98 82 130 174 124 178Z" />
      <path className="o-gold-l" d="M70 88 92 80 96 90 74 98Z" />
      <path className="o-gold-m" d="M86 122 104 115 106 122 88 129Z" />
    </g>
    {/* pleated cloak with a lilac lining at the hem */}
    <g className="o-part" data-fold="down">
      <g className="o-cape">
        <path className="o-violet-d" d="M100 118 116 118 72 300 42 314Z" />
        <path className="o-violet-x" d="M116 118 130 118 100 322 72 300Z" />
        <path className="o-violet-d" d="M130 118 142 120 134 314 100 322Z" />
        <path className="o-violet-x" d="M142 120 152 124 160 318 134 314Z" />
        <path
          className="o-lilac-d"
          d="M42 314 72 300 100 322 134 314 160 318 160 323 134 319 100 327 72 305 45 318Z"
        />
        <path
          className="o-crease"
          d="M116 118 72 300 M130 118 100 322 M142 120 134 314"
        />
      </g>
    </g>
    {/* legs and cuffed boots */}
    <g className="o-part o-legs" data-fold="up">
      <path className="o-steel-l" d="M108 252 120 252 118 292 107 292Z" />
      <path className="o-steel-d" d="M120 252 128 252 126 292 118 292Z" />
      <path className="o-steel-m" d="M134 252 145 252 146 292 136 292Z" />
      <path className="o-steel-x" d="M145 252 153 252 154 292 146 292Z" />
      <path className="o-violet-d" d="M105 290 118 290 118 318 105 318Z" />
      <path className="o-violet-x" d="M118 290 127 290 125 318 118 318Z" />
      <path className="o-violet-d" d="M135 290 146 290 146 318 136 318Z" />
      <path className="o-violet-x" d="M146 290 155 290 155 318 146 318Z" />
      <path className="o-lilac-m" d="M104 286 128 286 128 293 104 293Z" />
      <path className="o-lilac-d" d="M134 286 156 286 156 293 134 293Z" />
      <path className="o-ink" d="M105 316 125 316 142 331 102 331Z" />
      <path className="o-ink" d="M136 316 155 316 172 331 134 331Z" />
    </g>
    {/* harlequin tunic, belt and quiver strap */}
    <g className="o-part" data-fold="down">
      <g className="o-body">
        <path className="o-diamond" d="M104 124 128 124 126 198 100 198Z" />
        <path className="o-diamond" d="M128 124 150 124 154 198 126 198Z" />
        <path className="o-diamond" d="M100 204 126 204 120 262 94 262Z" />
        <path className="o-diamond" d="M126 204 154 204 160 262 120 262Z" />
        <path className="o-lift" d="M104 124 128 124 126 198 100 198Z" />
        <path className="o-shade" d="M128 124 150 124 154 198 126 198Z" />
        <path className="o-shade2" d="M126 204 154 204 160 262 120 262Z" />
        <path className="o-gold-l" d="M94 257 120 257 120 262 94 262Z" />
        <path className="o-gold-d" d="M120 257 160 257 160 262 120 262Z" />
        <path className="o-violet-x" d="M104 124 113 124 152 194 143 196Z" />
        <path className="o-violet-x" d="M99 194 127 194 127 206 98 206Z" />
        <path className="o-ink" d="M127 194 155 194 156 206 127 206Z" />
        <path className="o-gold-m" d="M120 193 132 193 132 207 120 207Z" />
        <path className="o-crease" d="M128 124 126 198 M126 204 120 262" />
      </g>
    </g>
    {/* pointed hood, lilac lining, capelet with a diamond clasp */}
    <g className="o-part o-head" data-fold="up">
      <g className="o-look">
        <g className="o-tassel">
          <path className="o-violet-x" d="M104 66 70 58 96 90Z" />
          <path className="o-violet-d" d="M104 66 96 90 108 80Z" />
        </g>
        <path
          className="o-violet-d"
          d="M100 120 96 86 104 66 124 74 120 120Z"
        />
        <path className="o-violet-l" d="M104 66 122 54 148 76 124 74Z" />
        <path
          className="o-violet-m"
          d="M124 74 148 76 154 98 150 120 120 120Z"
        />
        <path
          className="o-lilac-m"
          d="M127 80 150 80 156 102 150 118 136 118 125 98Z"
        />
        <path className="o-ink" d="M131 84 149 84 153 102 139 111 129 98Z" />
        <circle className="o-paper-l" cx="144" cy="94" r="1.6" />
        <path className="o-violet-d" d="M94 116 124 110 128 142 90 144Z" />
        <path className="o-violet-x" d="M124 110 154 116 160 140 128 142Z" />
        <path className="o-gold-m" d="M124 115 129 121 124 127 119 121Z" />
        <path className="o-crease" d="M124 74 120 120 M124 110 128 142" />
      </g>
    </g>
    {/* longbow: kraft limbs, violet grip, gold nocks */}
    <g className="o-part o-bow" data-fold="right">
      <path className="o-bowlimb" d="M186 62 C 216 112, 216 256, 186 306" />
      <path className="o-bowlimb-hi" d="M186 66 C 212 116, 212 252, 186 302" />
      <path className="o-violet-x" d="M200 172 210 172 210 196 200 196Z" />
      <circle className="o-gold-m" cx="186" cy="62" r="3" />
      <circle className="o-gold-m" cx="186" cy="306" r="3" />
      {/* the string bends back with the drawing hand */}
      <path className="o-bowstring o-string-top" d="M186 64 186 184" />
      <path className="o-bowstring o-string-bot" d="M186 184 186 304" />
    </g>
    {/* bow arm */}
    <g className="o-part o-arm" data-fold="right">
      <path className="o-diamond" d="M144 126 156 122 186 166 172 172Z" />
      <path className="o-shade" d="M156 122 162 126 188 162 186 166Z" />
      <path className="o-steel-l" d="M172 172 186 166 204 178 194 190Z" />
      <path className="o-steel-d" d="M194 190 204 178 210 184 208 194Z" />
      <path className="o-violet-x" d="M198 174 212 172 214 190 200 192Z" />
    </g>
    {/* nocked arrow and drawing hand */}
    <g className="o-part" data-fold="right">
      <g className="o-draw">
        <path className="o-shaft" d="M162 184 226 184" />
        <path className="o-steel-l" d="M224 180 234 184 224 184Z" />
        <path className="o-steel-d" d="M224 184 234 184 224 188Z" />
        <path className="o-coral-m" d="M162 184 168 178 176 178 172 184Z" />
        <path className="o-coral-d" d="M162 184 172 184 176 190 168 190Z" />
        <path className="o-violet-x" d="M180 177 191 177 191 191 180 191Z" />
      </g>
    </g>
  </g>
);

// knight on a horse in a patterned caparison, lance and pennant raised
const Rider = ({ transform, flip }) => (
  <g className="o-rider" transform={transform}>
    <ellipse className="o-shadow" cx="206" cy="331" rx="160" ry="8" />
    {/* tail */}
    <g className="o-part o-tail" data-fold="left">
      <g className="o-swish">
        <path className="o-violet-m" d="M104 156 82 172 64 226 90 196Z" />
        <path className="o-violet-d" d="M90 196 64 226 70 250 98 208Z" />
        <path className="o-violet-l" d="M104 156 98 208 108 176Z" />
      </g>
    </g>
    {/* far legs */}
    <g className="o-part o-legs-far" data-fold="up">
      <path className="o-paper-d" d="M124 244 136 244 138 316 128 316Z" />
      <path className="o-ink" d="M126 314 140 314 142 330 124 330Z" />
      <path className="o-paper-d" d="M262 244 274 244 276 316 266 316Z" />
      <path className="o-ink" d="M264 314 278 314 280 330 262 330Z" />
    </g>
    {/* neck, mane and head */}
    <g className="o-part o-horse-head" data-fold="right">
      <g className="o-nod">
        <path className="o-paper-l" d="M258 132 318 70 334 90 280 146Z" />
        <path className="o-paper-m" d="M280 146 334 90 346 108 306 158Z" />
        <path
          className="o-violet-d"
          d="M258 132 260 114 274 118 276 102 290 104 292 88 306 90 308 76 318 70Z"
        />
        <path className="o-violet-m" d="M260 114 274 118 270 130 258 132Z" />
        <path className="o-paper-m" d="M322 70 326 42 338 64Z" />
        <path className="o-paper-d" d="M332 64 346 44 348 68Z" />
        <path className="o-paper-l" d="M318 70 340 60 388 98 356 100Z" />
        <path className="o-paper-m" d="M318 70 356 100 346 112 332 90Z" />
        <path
          className="o-paper-d"
          d="M356 100 388 98 396 114 374 126 346 112Z"
        />
        <path className="o-steel-l" d="M338 64 384 96 372 104 332 80Z" />
        <path className="o-steel-d" d="M332 80 372 104 364 110 334 90Z" />
        <circle className="o-ink" cx="352" cy="82" r="2.4" />
        <path className="o-rein" d="M378 122 C 330 158, 292 156, 254 126" />
      </g>
    </g>
    {/* caparison (patterned horse cloth) with a coral fringe */}
    <g className="o-part o-caparison" data-fold="down">
      <path
        className="o-zebra"
        d="M300 146 276 128 230 124 180 124 140 130 112 142 100 168 102 246 306 246 314 196Z"
      />
      <path
        className="o-lift"
        d="M112 142 140 130 150 130 152 246 102 246 100 168Z"
      />
      <path className="o-shade" d="M206 124 262 126 264 246 208 246Z" />
      <path
        className="o-shade2"
        d="M262 126 276 128 300 146 314 196 306 246 264 246Z"
      />
      <path
        className="o-crease"
        d="M150 130 152 246 M206 124 208 246 M262 126 264 246"
      />
      <path
        className="o-gold-m"
        d="M112 142 140 130 180 124 230 124 276 128 300 146 296 152 274 136 230 132 180 132 142 138 116 150Z"
      />
      <path
        className="o-coral-m"
        d="M102 246 306 246 300 258 290 248 280 258 270 248 260 258 250 248 240 258 230 248 220 258 210 248 200 258 190 248 180 258 170 248 160 258 150 248 140 258 130 248 120 258 110 248Z"
      />
    </g>
    {/* near legs, with a hock on the hind leg */}
    <g className="o-part o-legs" data-fold="up">
      <path
        className="o-paper-l"
        d="M140 250 150 250 154 284 146 316 138 316 144 284Z"
      />
      <path
        className="o-paper-m"
        d="M150 250 160 250 164 284 154 316 146 316 154 284Z"
      />
      <path className="o-ink" d="M136 314 156 314 158 330 134 330Z" />
      <path
        className="o-paper-l"
        d="M278 250 288 250 290 290 288 316 280 316 280 290Z"
      />
      <path
        className="o-paper-m"
        d="M288 250 296 250 298 290 296 316 288 316 290 290Z"
      />
      <path className="o-ink" d="M278 314 298 314 300 330 276 330Z" />
    </g>
    {/* rider: cape, leg, saddle */}
    <g className="o-part o-rider-cape" data-fold="left">
      <path className="o-violet-m" d="M184 80 200 80 150 148 122 136Z" />
      <path className="o-violet-d" d="M200 80 214 82 176 152 150 148Z" />
      <path className="o-crease" d="M200 80 150 148" />
    </g>
    <path className="o-leather-l" d="M168 118 236 118 240 132 164 132Z" />
    <path className="o-leather-d" d="M200 118 236 118 240 132 200 132Z" />
    <g className="o-part o-rider-leg" data-fold="down">
      <path className="o-steel-l" d="M196 118 214 116 236 166 220 174Z" />
      <path className="o-steel-d" d="M214 116 222 118 240 160 236 166Z" />
      <path className="o-steel-m" d="M220 174 236 166 238 222 226 224Z" />
      <path className="o-steel-x" d="M236 166 242 170 244 220 238 222Z" />
      <path className="o-steel-d" d="M222 220 242 218 252 232 220 234Z" />
      <path className="o-gold-m" d="M218 230 246 230 244 240 220 240Z" />
    </g>
    {/* rider body, helm and plume */}
    <g className="o-part o-rider-body" data-fold="up">
      <path className="o-zebra" d="M184 72 200 72 200 122 180 122Z" />
      <path className="o-zebra" d="M200 72 216 72 222 122 200 122Z" />
      <path className="o-lift" d="M184 72 200 72 200 122 180 122Z" />
      <path className="o-shade" d="M200 72 216 72 222 122 200 122Z" />
      <path className="o-gold-l" d="M181 106 200 106 200 114 181 114Z" />
      <path className="o-gold-d" d="M200 106 220 106 221 114 200 114Z" />
    </g>
    <g className="o-part o-rider-head" data-fold="up">
      <g className="o-plume">
        <path className="o-coral-l" d="M198 34 184 18 164 14 176 32Z" />
        <path className="o-coral-d" d="M176 32 164 14 134 10 154 30Z" />
        <path className="o-coral-m" d="M184 18 170 6 134 10 164 14Z" />
      </g>
      <path className="o-steel-l" d="M188 38 200 33 200 70 186 70Z" />
      <path className="o-steel-m" d="M200 33 212 36 216 70 200 70Z" />
      <path className="o-ink" d="M198 48 217 48 217 52 198 53Z" />
      <circle className="o-ink" cx="208" cy="60" r="1.2" />
      <circle className="o-ink" cx="213" cy="60" r="1.2" />
      <path className="o-steel-d" d="M186 70 216 70 218 78 184 78Z" />
      <path className="o-crease" d="M200 33 200 70" />
    </g>
    {/* lance with a vamplate and pennant */}
    <g className="o-part o-spear" data-fold="up">
      <path className="o-wood-l" d="M248 -58 252 -58 249 236 245 236Z" />
      <path className="o-wood-d" d="M252 -58 256 -58 253 236 249 236Z" />
      <path className="o-steel-l" d="M252 -78 245 -58 252 -50Z" />
      <path className="o-steel-d" d="M252 -78 259 -58 252 -50Z" />
      <path className="o-steel-l" d="M240 118 251 100 251 124Z" />
      <path className="o-steel-d" d="M251 100 262 118 251 124Z" />
    </g>
    <g className="o-part o-pennant" data-fold="left">
      <g className="o-wave">
        <path className="o-violet-l" d="M248 -52 176 -46 202 -33 248 -33Z" />
        <path className="o-violet-d" d="M248 -33 202 -33 180 -18 248 -14Z" />
        <path className="o-coral-m" d="M222 -44 230 -48 238 -43 230 -38Z" />
        <path
          className="o-coral-d"
          d="M230 -38 238 -43 238 -34 230 -29 222 -34 222 -44Z"
        />
      </g>
    </g>
    {/* near arm and gauntlet on the lance */}
    <g className="o-part o-arm" data-fold="right">
      <path className="o-scales" d="M210 76 222 74 238 104 226 110Z" />
      <path className="o-shade" d="M222 74 228 78 240 100 238 104Z" />
      <path className="o-steel-l" d="M226 110 238 104 252 118 240 124Z" />
      <path className="o-steel-l" d="M242 112 258 112 258 124 242 126Z" />
      <path className="o-steel-d" d="M242 126 258 124 256 132 244 134Z" />
    </g>
    {/* shield hanging on the near side */}
    <g className="o-part o-shield" data-fold="down">
      <path
        className="o-gold-l"
        d="M158 112 182 112 182 190 170 172 161 150 158 130Z"
      />
      <path
        className="o-gold-d"
        d="M182 112 206 112 206 130 203 150 194 172 182 190Z"
      />
      <path
        className="o-violet-l"
        d="M162 116 182 116 182 182 172 166 165 148 162 130Z"
      />
      <path
        className="o-violet-d"
        d="M182 116 202 116 202 130 199 148 192 166 182 182Z"
      />
      <Emblem flip={flip} x={172} y={128} scale={0.23} />
      <path className="o-crease" d="M182 112 182 190" />
    </g>
  </g>
);

// heavy castle guard: kettle helm, chevron tabard, glaive and a tall pavise
// with the lock (raised now and then)
const Guard = ({ transform, flip }) => (
  <g className="o-guard" transform={transform}>
    <ellipse className="o-shadow" cx="130" cy="331" rx="84" ry="7" />
    {/* glaive: a leaf blade on a long shaft, coral tassel at the collar */}
    <g className="o-part o-spear" data-fold="up">
      <path className="o-wood-l" d="M66 46 70 46 71 330 67 330Z" />
      <path className="o-wood-d" d="M70 46 74 46 75 330 71 330Z" />
      <path className="o-steel-l" d="M70 0 62 24 64 44 70 50Z" />
      <path className="o-steel-d" d="M70 0 C 84 12, 84 34, 70 50Z" />
      <path className="o-gold-l" d="M63 48 70 48 70 56 63 56Z" />
      <path className="o-gold-d" d="M70 48 77 48 77 56 70 56Z" />
      <g className="o-dangle">
        <path className="o-coral-m" d="M64 56 70 56 68 76 62 72Z" />
        <path className="o-coral-d" d="M70 56 76 56 74 72 68 76Z" />
      </g>
    </g>
    {/* short cape */}
    <g className="o-part" data-fold="down">
      <g className="o-cape">
        <path className="o-violet-d" d="M100 118 118 118 96 262 74 270Z" />
        <path className="o-violet-x" d="M118 118 136 118 124 276 96 262Z" />
        <path className="o-violet-d" d="M136 118 152 118 156 270 124 276Z" />
        <path className="o-violet-x" d="M152 118 166 122 186 262 156 270Z" />
        <path
          className="o-crease"
          d="M118 118 96 262 M136 118 124 276 M152 118 156 270"
        />
      </g>
    </g>
    {/* plate legs */}
    <g className="o-part o-legs" data-fold="up">
      <path className="o-steel-l" d="M104 250 118 250 116 282 104 282Z" />
      <path className="o-steel-d" d="M118 250 128 250 126 282 116 282Z" />
      <path className="o-steel-l" d="M102 282 115 274 117 288 104 292Z" />
      <path className="o-steel-m" d="M115 274 127 282 126 292 117 288Z" />
      <path className="o-steel-l" d="M104 292 117 288 114 316 101 316Z" />
      <path className="o-steel-d" d="M117 288 126 292 124 316 114 316Z" />
      <path className="o-steel-m" d="M136 250 148 250 148 282 137 282Z" />
      <path className="o-steel-x" d="M148 250 160 250 160 282 148 282Z" />
      <path className="o-steel-m" d="M136 282 148 275 149 290 138 292Z" />
      <path className="o-steel-d" d="M148 275 160 282 160 292 149 290Z" />
      <path className="o-steel-m" d="M138 292 149 290 149 316 139 316Z" />
      <path className="o-steel-x" d="M149 290 160 292 161 316 149 316Z" />
      <path className="o-steel-l" d="M101 314 114 314 105 322 80 331Z" />
      <path
        className="o-steel-d"
        d="M114 314 124 316 125 331 80 331 105 322Z"
      />
      <path className="o-steel-m" d="M139 314 152 314 142 322 126 331Z" />
      <path
        className="o-steel-x"
        d="M152 314 161 316 162 331 126 331 142 322Z"
      />
    </g>
    {/* chevron tabard over plate, gold hem */}
    <g className="o-part" data-fold="down">
      <g className="o-body">
        <path className="o-chev" d="M100 124 132 124 130 196 96 196Z" />
        <path className="o-chev" d="M132 124 164 124 166 196 130 196Z" />
        <path className="o-chev" d="M96 202 130 202 127 258 90 258Z" />
        <path className="o-chev" d="M130 202 166 202 172 258 127 258Z" />
        <path className="o-lift" d="M100 124 132 124 130 196 96 196Z" />
        <path className="o-shade" d="M132 124 164 124 166 196 130 196Z" />
        <path className="o-shade2" d="M130 202 166 202 172 258 127 258Z" />
        <path className="o-gold-l" d="M90 253 127 253 127 260 89 260Z" />
        <path className="o-gold-d" d="M127 253 172 253 173 260 127 260Z" />
        <path className="o-steel-l" d="M95 192 130 192 130 204 94 204Z" />
        <path className="o-steel-d" d="M130 192 166 192 167 204 130 204Z" />
        <path className="o-gold-m" d="M124 190 136 190 136 206 124 206Z" />
        <path className="o-crease" d="M132 124 130 196 M130 202 127 258" />
      </g>
    </g>
    {/* arm and gauntlet on the shaft */}
    <g className="o-part o-hand" data-fold="left">
      <path className="o-scales" d="M92 140 108 146 84 188 72 184Z" />
      <path className="o-shade" d="M100 143 108 146 84 188 78 186Z" />
      <path className="o-steel-l" d="M60 184 82 182 82 194 60 196Z" />
      <path className="o-steel-d" d="M60 196 82 194 80 204 62 206Z" />
    </g>
    {/* kettle helm with a bevor, pauldrons */}
    <g className="o-part o-head" data-fold="up">
      <g className="o-look">
        <path className="o-steel-l" d="M90 116 130 110 130 136 86 140Z" />
        <path className="o-steel-d" d="M130 110 170 116 174 140 130 136Z" />
        <path className="o-steel-m" d="M86 140 130 136 130 146 88 150Z" />
        <path className="o-steel-x" d="M130 136 174 140 172 150 130 146Z" />
        <path className="o-steel-l" d="M112 84 130 84 130 112 114 112Z" />
        <path className="o-steel-d" d="M130 84 148 84 146 112 130 112Z" />
        <circle className="o-ink" cx="121" cy="99" r="1.3" />
        <circle className="o-ink" cx="121" cy="105" r="1.3" />
        <path className="o-ink" d="M110 72 150 72 148 88 112 88Z" />
        <path className="o-lilac-m" d="M134 79 143 79 143 81.5 134 81.5Z" />
        <path className="o-steel-l" d="M112 70 116 52 130 42 130 70Z" />
        <path className="o-steel-d" d="M130 42 144 52 148 70 130 70Z" />
        <path className="o-gold-m" d="M128 40 132 40 132 70 128 70Z" />
        <path className="o-steel-m" d="M92 78 130 66 130 76 97 84Z" />
        <path className="o-steel-x" d="M130 66 168 78 163 84 130 76Z" />
      </g>
    </g>
    {/* pavise: lock and two chevrons */}
    <g className="o-part o-shield" data-fold="down">
      <g className="o-raise">
        <path
          className="o-gold-l"
          d="M118 142 128 130 166 126 166 298 118 272Z"
        />
        <path
          className="o-gold-d"
          d="M166 126 204 130 214 142 214 272 166 298Z"
        />
        <path
          className="o-violet-l"
          d="M124 146 132 136 166 132 166 290 124 267Z"
        />
        <path
          className="o-violet-d"
          d="M166 132 200 136 208 146 208 267 166 290Z"
        />
        <Emblem flip={flip} x={148} y={158} scale={0.42} />
        <path className="o-coral-m" d="M140 234 166 218 166 230 140 246Z" />
        <path className="o-coral-d" d="M166 218 192 234 192 246 166 230Z" />
        <path className="o-coral-m" d="M140 254 166 238 166 248 140 264Z" />
        <path className="o-coral-d" d="M166 238 192 254 192 264 166 248Z" />
        <path className="o-crease" d="M166 126 166 298" />
      </g>
    </g>
  </g>
);

// young scout on a rock, searching the horizon through a spyglass
const Scout = ({ transform }) => (
  <g className="o-scout" transform={transform}>
    <ellipse className="o-shadow" cx="130" cy="331" rx="72" ry="6" />
    {/* faceted rock */}
    <g className="o-part" data-fold="up">
      <path className="o-lilac-l" d="M68 331 82 306 112 294 124 331Z" />
      <path className="o-lilac-m" d="M112 294 152 290 164 331 124 331Z" />
      <path className="o-lilac-d" d="M152 290 182 304 194 331 164 331Z" />
      <path className="o-crease" d="M112 294 124 331 M152 290 164 331" />
    </g>
    {/* coral cape */}
    <g className="o-part" data-fold="down">
      <g className="o-cape">
        <path className="o-coral-m" d="M108 150 120 150 96 250 78 256Z" />
        <path className="o-coral-d" d="M120 150 132 150 116 262 96 250Z" />
        <path className="o-coral-m" d="M132 150 142 152 140 256 116 262Z" />
        <path className="o-crease" d="M120 150 96 250 M132 150 116 262" />
      </g>
    </g>
    {/* legs and boots */}
    <g className="o-part o-legs" data-fold="up">
      <path className="o-violet-d" d="M112 236 122 236 121 272 112 272Z" />
      <path className="o-violet-x" d="M122 236 128 236 127 272 121 272Z" />
      <path className="o-violet-d" d="M134 236 143 236 144 272 135 272Z" />
      <path className="o-violet-x" d="M143 236 150 236 151 272 144 272Z" />
      <path className="o-steel-l" d="M110 270 120 270 120 292 110 292Z" />
      <path className="o-steel-d" d="M120 270 128 270 127 292 120 292Z" />
      <path className="o-steel-m" d="M134 270 144 270 144 292 135 292Z" />
      <path className="o-steel-x" d="M144 270 151 270 152 292 144 292Z" />
      <path className="o-ink" d="M109 290 128 290 138 298 107 298Z" />
      <path className="o-ink" d="M134 290 152 290 164 297 133 297Z" />
    </g>
    {/* harlequin jerkin */}
    <g className="o-part" data-fold="down">
      <g className="o-body">
        <path className="o-diamond" d="M110 152 130 152 128 202 106 202Z" />
        <path className="o-diamond" d="M130 152 148 152 152 202 128 202Z" />
        <path className="o-diamond" d="M106 208 128 208 124 240 102 240Z" />
        <path className="o-diamond" d="M128 208 152 208 156 240 124 240Z" />
        <path className="o-lift" d="M110 152 130 152 128 202 106 202Z" />
        <path className="o-shade" d="M130 152 148 152 152 202 128 202Z" />
        <path className="o-shade2" d="M128 208 152 208 156 240 124 240Z" />
        <path className="o-violet-x" d="M105 198 128 198 128 210 104 210Z" />
        <path className="o-ink" d="M128 198 153 198 154 210 128 210Z" />
        <path className="o-gold-m" d="M122 197 132 197 132 211 122 211Z" />
        <path className="o-crease" d="M130 152 128 202 M128 208 124 240" />
      </g>
    </g>
    {/* mail coif, feathered cap */}
    <g className="o-part o-head" data-fold="up">
      <g className="o-look">
        <g className="o-tassel">
          <path className="o-coral-l" d="M112 108 84 92 96 112Z" />
          <path className="o-coral-d" d="M112 108 96 112 108 116Z" />
        </g>
        <path
          className="o-scales"
          d="M110 154 108 126 116 112 136 110 146 122 148 154Z"
        />
        <path className="o-shade" d="M130 110 146 122 148 154 130 154Z" />
        <path className="o-ink" d="M132 122 148 122 151 142 137 146 130 134Z" />
        <path
          className="o-violet-l"
          d="M106 118 118 100 138 98 150 114 128 112Z"
        />
        <path
          className="o-violet-d"
          d="M128 112 150 114 154 122 108 124 106 118Z"
        />
      </g>
    </g>
    {/* spyglass raised to the eye; sweeps the horizon */}
    <g className="o-part o-arm" data-fold="right">
      <g className="o-scan">
        <path className="o-diamond" d="M143 158 153 162 177 122 167 118Z" />
        <path
          className="o-steel-l"
          d="M144.5 124.8 159 118 160.5 121.2 146 128Z"
        />
        <path
          className="o-steel-d"
          d="M146 128 160.5 121.2 162 124.4 147.5 131.2Z"
        />
        <path
          className="o-gold-l"
          d="M158.4 116.7 180.1 106.5 182.2 111 160.5 121.2Z"
        />
        <path
          className="o-gold-d"
          d="M160.5 121.2 182.2 111 184.3 115.5 162.6 125.7Z"
        />
        <path
          className="o-gold-l"
          d="M179.4 105.1 202.9 94 205.7 99.9 182.2 111Z"
        />
        <path
          className="o-gold-d"
          d="M182.2 111 205.7 99.9 208.5 105.8 185 116.9Z"
        />
        <path
          className="o-steel-d"
          d="M178.4 104.6 181.2 103.3 188 117.8 185.2 119.1Z"
        />
        <path
          className="o-violet-l"
          d="M202.9 94 205.2 92.9 211 105.3 208.5 105.8Z"
        />
        <path className="o-steel-l" d="M166 114 176 110 180 120 170 124Z" />
      </g>
    </g>
  </g>
);

// royal messenger striding with a charter under the BMDRM seal
const Messenger = ({ transform, flip }) => (
  <g className="o-messenger" transform={transform}>
    <ellipse className="o-shadow" cx="132" cy="331" rx="74" ry="7" />
    {/* short cape */}
    <g className="o-part" data-fold="down">
      <g className="o-cape">
        <path className="o-violet-l" d="M104 120 118 120 96 244 76 250Z" />
        <path className="o-violet-m" d="M118 120 132 120 118 254 96 244Z" />
        <path className="o-violet-l" d="M132 120 144 122 140 250 118 254Z" />
        <path className="o-crease" d="M118 120 96 244 M132 120 118 254" />
      </g>
    </g>
    {/* striding legs */}
    <g className="o-part o-legs" data-fold="up">
      <path className="o-violet-x" d="M110 248 124 248 108 316 96 313Z" />
      <path className="o-ink" d="M95 311 109 315 116 331 88 331Z" />
      <path className="o-violet-d" d="M130 248 146 248 166 314 152 316Z" />
      <path className="o-violet-x" d="M140 248 146 248 166 314 160 315Z" />
      <path className="o-ink" d="M152 313 166 311 188 331 150 331Z" />
    </g>
    {/* zebra tabard with a violet panel bearing the lock */}
    <g className="o-part" data-fold="down">
      <g className="o-body">
        <path className="o-zebra" d="M104 124 128 124 126 196 100 196Z" />
        <path className="o-zebra" d="M128 124 150 124 154 196 126 196Z" />
        <path className="o-zebra" d="M100 202 126 202 118 256 92 256Z" />
        <path className="o-zebra" d="M126 202 154 202 164 256 118 256Z" />
        <path className="o-lift" d="M104 124 128 124 126 196 100 196Z" />
        <path className="o-shade" d="M128 124 150 124 154 196 126 196Z" />
        <path className="o-shade2" d="M126 202 154 202 164 256 118 256Z" />
        <path className="o-violet-m" d="M116 128 128 128 128 196 114 196Z" />
        <path className="o-violet-d" d="M128 128 140 128 142 196 128 196Z" />
        <Emblem flip={flip} x={120.7} y={140} scale={0.17} />
        <path className="o-gold-l" d="M99 192 126 192 126 204 98 204Z" />
        <path className="o-gold-d" d="M126 192 155 192 156 204 126 204Z" />
        <path className="o-coral-m" d="M92 250 118 250 118 256 92 256Z" />
        <path className="o-coral-d" d="M118 250 164 250 164 256 118 256Z" />
        <path className="o-crease" d="M128 124 126 196 M126 202 118 256" />
      </g>
    </g>
    {/* coif, chaperon hat with a coral tail */}
    <g className="o-part o-head" data-fold="up">
      <g className="o-look">
        <g className="o-tassel">
          <path className="o-coral-m" d="M110 80 88 96 82 150 94 104 116 88Z" />
          <path className="o-coral-d" d="M82 150 94 104 99 107 90 152Z" />
        </g>
        <path
          className="o-paper-l"
          d="M108 122 106 98 114 82 130 78 130 122Z"
        />
        <path
          className="o-paper-d"
          d="M130 78 144 86 150 104 148 122 130 122Z"
        />
        <path className="o-ink" d="M132 92 148 92 151 110 138 116 130 104Z" />
        <circle className="o-paper-l" cx="144" cy="101" r="1.5" />
        <path className="o-violet-m" d="M104 86 116 70 132 66 132 86Z" />
        <path className="o-violet-d" d="M132 66 148 72 155 88 132 86Z" />
        <path className="o-violet-x" d="M104 86 155 88 151 94 108 92Z" />
        <path className="o-gold-l" d="M104 118 130 114 130 126 102 128Z" />
        <path className="o-gold-d" d="M130 114 152 118 154 128 130 126Z" />
      </g>
    </g>
    {/* arms carrying the charter; the seal hangs from two ribbons */}
    <g className="o-part o-arm" data-fold="right">
      <path className="o-violet-m" d="M140 128 154 124 172 158 160 166Z" />
      <path className="o-violet-d" d="M154 124 160 128 178 154 172 158Z" />
      <path className="o-paper-l" d="M150 150 212 150 212 159 150 159Z" />
      <path className="o-paper-d" d="M150 159 212 159 212 167 150 167Z" />
      <ellipse className="o-paper-m" cx="150" cy="158.5" rx="4" ry="8.5" />
      <ellipse className="o-paper-d" cx="212" cy="158.5" rx="4" ry="8.5" />
      <path className="o-steel-l" d="M160 154 176 150 180 164 164 168Z" />
      <g className="o-dangle">
        <path className="o-violet-m" d="M186 166 190 166 186 186 182 184Z" />
        <path className="o-violet-d" d="M192 166 196 166 196 186 192 186Z" />
        <circle className="o-coral-m" cx="190" cy="190" r="8" />
        <path className="o-coral-d" d="M190 182 A8 8 0 0 1 190 198Z" />
        <path className="o-paper-l" d="M187.5 186.5 v7 l6 -3.5z" />
      </g>
    </g>
  </g>
);

// box and viewBox per figure, for <Place> and <OrigamiFigure>
export const FIGURES = {
  knight: { Figure: Knight, width: 240, viewBox: "0 0 240 340" },
  archer: { Figure: Archer, width: 240, viewBox: "0 0 240 340" },
  guard: { Figure: Guard, width: 240, viewBox: "0 0 240 340" },
  scout: { Figure: Scout, width: 240, viewBox: "0 80 240 260" },
  messenger: { Figure: Messenger, width: 240, viewBox: "0 40 240 300" },
  rider: { Figure: Rider, width: 400, viewBox: "0 -80 400 420" },
};

// a figure inside a scene: (x, y) is the top-left of its box, `flip` makes
// it face left
export const Place = ({ name, x, y, scale = 1, flip = false }) => {
  const { Figure, width } = FIGURES[name];
  const transform = flip
    ? path`translate(${x + width * scale} ${y}) scale(${-scale} ${scale})`
    : path`translate(${x} ${y}) scale(${scale})`;
  return <Figure transform={transform} flip={flip} />;
};
