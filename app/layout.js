"use client";

import config from "@config/config.json";
import theme from "@config/theme.json";
import TwSizeIndicator from "@layouts/components/TwSizeIndicator";
import { useEffect, useRef } from "react";
import Header from "@layouts/partials/Header";
import "../styles/style.scss";
import Head from 'next/head';

export default function RootLayout({ children }) {
  const canvasRef = useRef(null);

  const pf = theme.fonts.font_family.primary;
  const sf = theme.fonts.font_family.secondary;

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Dynamically load jQuery
      const jQueryScript = document.createElement("script");
      jQueryScript.src = "https://code.jquery.com/jquery-3.6.0.min.js";
      jQueryScript.async = true;
      document.head.appendChild(jQueryScript);

      jQueryScript.onload = () => {
        // After jQuery is loaded, load your custom script
        const customScript = document.createElement("script");
        customScript.innerHTML = `
        (function() {
          var ParticleNetworkAnimation, PNA;
          ParticleNetworkAnimation = PNA = function() {};

          PNA.prototype.init = function(element) {
            this.$el = $(element); // Ensure jQuery is used here
            this.container = element;
            this.canvas = document.createElement('canvas');
            this.sizeCanvas();
            this.container.appendChild(this.canvas);
            this.ctx = this.canvas.getContext('2d');
            this.particleNetwork = new ParticleNetwork(this);

             this.bindUiActions();
            return this;
          };

          PNA.prototype.bindUiActions = function() {
            $(window).on('resize', function() {
              this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
              this.sizeCanvas();
              this.particleNetwork.createParticles();
            }.bind(this));
          };

          PNA.prototype.sizeCanvas = function() {
            this.canvas.width = this.container.offsetWidth;
            this.canvas.height = this.container.offsetHeight;
          };

          var Particle = function(parent, x, y) {
            this.network = parent;
            this.canvas = parent.canvas;
            this.ctx = parent.ctx;
            this.particleColor = returnRandomArrayitem(this.network.options.particleColors);
            this.radius = getLimitedRandom(1.5, 2.5);
            this.opacity = 0;
            this.x = x || Math.random() * this.canvas.width;
            this.y = y || Math.random() * this.canvas.height;
            this.velocity = {
              x: (Math.random() - 0.5) * parent.options.velocity,
              y: (Math.random() - 0.5) * parent.options.velocity
            };
          };

          Particle.prototype.update = function() {
            if (this.opacity < 1) {
              this.opacity += 0.01;
            } else {
              this.opacity = 1;
            }
            if (this.x > this.canvas.width + 100 || this.x < -100) {
              this.velocity.x = -this.velocity.x;
            }
            if (this.y > this.canvas.height + 100 || this.y < -100) {
              this.velocity.y = -this.velocity.y;
            }
            this.x += this.velocity.x;
            this.y += this.velocity.y;
          };

          Particle.prototype.draw = function() {
            this.ctx.beginPath();
            this.ctx.fillStyle = this.particleColor;
            this.ctx.globalAlpha = this.opacity;
            this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            this.ctx.fill();
          };

          var ParticleNetwork = function(parent) {
            this.options = {
              velocity: 1,
              density: 15000,
              netLineDistance: 200,
              netLineColor: '#929292',
              particleColors: ['#aaa']
            };
            this.canvas = parent.canvas;
            this.ctx = parent.ctx;

            this.init();
          };

          ParticleNetwork.prototype.init = function() {
            this.createParticles(true);
            this.animationFrame = requestAnimationFrame(this.update.bind(this));
             this.bindUiActions();
          };

          ParticleNetwork.prototype.createParticles = function(isInitial) {
            var me = this;
            this.particles = [];
            var quantity = this.canvas.width * this.canvas.height / this.options.density;

            if (isInitial) {
              var counter = 0;
              clearInterval(this.createIntervalId);
              this.createIntervalId = setInterval(function() {
                if (counter < quantity - 1) {
                  this.particles.push(new Particle(this));
                } else {
                  clearInterval(me.createIntervalId);
                }
                counter++;
              }.bind(this), 250);
            } else {
              for (var i = 0; i < quantity; i++) {
                this.particles.push(new Particle(this));
              }
            }
          };

          ParticleNetwork.prototype.update = function() {
            if (this.canvas) {
              this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
              this.ctx.globalAlpha = 1;

              for (var i = 0; i < this.particles.length; i++) {
                for (var j = this.particles.length - 1; j > i; j--) {
                  var distance, p1 = this.particles[i], p2 = this.particles[j];
                  distance = Math.min(Math.abs(p1.x - p2.x), Math.abs(p1.y - p2.y));
                  if (distance > this.options.netLineDistance) continue;
                  distance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
                  if (distance > this.options.netLineDistance) continue;

                  this.ctx.beginPath();
                  this.ctx.strokeStyle = this.options.netLineColor;
                  this.ctx.globalAlpha = (this.options.netLineDistance - distance) / this.options.netLineDistance * p1.opacity * p2.opacity;
                  this.ctx.lineWidth = 0.7;
                  this.ctx.moveTo(p1.x, p1.y);
                  this.ctx.lineTo(p2.x, p2.y);
                  this.ctx.stroke();
                }
              }

              for (var i = 0; i < this.particles.length; i++) {
                this.particles[i].update();
                this.particles[i].draw();
              }

              if (this.options.velocity !== 0) {
                this.animationFrame = requestAnimationFrame(this.update.bind(this));
              }
            } else {
              cancelAnimationFrame(this.animationFrame);
            }
          };

          var getLimitedRandom = function(min, max) {
            return Math.random() * (max - min) + min;
          };

          var returnRandomArrayitem = function(array) {
            return array[Math.floor(Math.random() * array.length)];
          };

          var particleNetworkInstance = new ParticleNetworkAnimation();
          particleNetworkInstance.init(document.querySelector('.particle-network-animation'));
        }());
        `;
        document.body.appendChild(customScript);

        return () => {
          document.body.removeChild(customScript);
        };
      };

      return () => {
        document.head.removeChild(jQueryScript);
      };
    }
  }, []);

  return (
    <html suppressHydrationWarning={true} lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href={config.site.favicon} />
        <meta name="theme-name" content="andromeda-light-nextjs" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href={`https://fonts.googleapis.com/css2?family=${pf}${sf ? `&family=${sf}` : ""}`}
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.$takiChat = [];
              window.WEBSITE_ID = "74504d7f-d7a5-8644-e";
              (function () {
                var d = document;
                var s = d.createElement("script");
                s.src ="https://api.messaggera.com/api/owner/websites/74504d7f-d7a5-8644-e/check";
                s.async = true;
                d.getElementsByTagName("head")[0].appendChild(s);
              })();
            `,
          }}
        />
      </Head>
    
      <body
        className={`${pf.variable} ${sf.variable} font-primary bg-white`}
      >
        <TwSizeIndicator />
        <Header />
        <div className="particle-network-animation" ref={canvasRef}></div>
        <div className="glow glow-1"></div>
        <div className="glow glow-2"></div>
        <div className="glow glow-3"></div>
        {children}
      </body>
    </html>
  );
}
