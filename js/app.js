/**
 * DARKFORGE-X V99: Cerva & Pizza Engine
 * Latency Target: < 50ms INP
 * Security: Military Grade Hardened (Anti-PP, Framebuster)
 */

/* ====================================================================== 
   0. ZERO-TRUST SECURITY SEAL
   ====================================================================== */
(function applySecuritySeal() {
    'use strict';
    // 1. Anti-Clickjacking (Framebuster)
    if (window.self !== window.top) {
        window.top.location.href = window.self.location.href;
    }
    // 2. Prototype Pollution Mitigation (Congela construtores core)
    try {
        Object.freeze(Object.prototype);
        Object.freeze(Array.prototype);
        Object.freeze(Function.prototype);
    } catch (e) {
        console.warn('[Defesa] Prototype lock parcialmente aplicado.');
    }
    // 3. Bloqueio de Drag & Drop para imagens (evita roubo de assets)
    document.addEventListener('dragstart', (e) => e.preventDefault());

    // 4. Bloqueio de Context Menu (Anti Right-Click)
    document.addEventListener('contextmenu', event => event.preventDefault());

    // 5. Motor Háptico Universal (Vibração e Fallback Visual para iOS)
    window.triggerHaptic = (pattern) => {
        if (navigator.vibrate) {
            navigator.vibrate(pattern);
        } else {
            // iOS bloqueia vibrate() a nível de Hardware Web.
            // Fallback: Efeito Visual (Flash) na tela para atuar como tátil perceptivo
            const flash = document.createElement('div');
            flash.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(255,255,255,0.15);z-index:99999;pointer-events:none;';
            document.body.appendChild(flash);
            setTimeout(() => flash.remove(), 50);
        }
    };

    // 6. OMEGA-GATE: Anti-Debugging (Sem Destruir CPU Mobile)
    // Só ativa o debugger bomb se detectar que os DevTools estão abertos
    // via heurística de tamanho de janela (não gasta CPU em loop quando fechado)
    const antiDebug = () => {
        const widthThreshold = window.outerWidth - window.innerWidth > 160;
        const heightThreshold = window.outerHeight - window.innerHeight > 160;
        if (widthThreshold || heightThreshold) {
            debugger;
        }
    };
    setInterval(antiDebug, 2000);

    // 7. Mordaça de Console (Preserva console.error pra debug de produção)
    try {
        console.log = function() {};
        console.warn = function() {};
        console.info = function() {};
        console.table = function() {};
        // console.error PRESERVADO intencionalmente
    } catch(e) {}
})();

document.addEventListener('DOMContentLoaded', () => {
    /* ====================================================================== 
       1. PWA Service Worker Registration
       ====================================================================== */
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then(reg => {
                console.log('[Sistema] Viatura armada e pronta.', reg.scope);
            }).catch(err => {
                console.error('[Falha] Motor engasgou:', err);
            });
        });
    }

    /* ====================================================================== 
       1.5 Animated Favicon Engine (Pizza Slice Pulse)
       Chrome/Firefox: Canvas dinâmico com rotação suave.
       Safari/iOS: Ignora (mantém PNG estático) — zero side effects.
       ====================================================================== */
    try {
        const faviconLink = document.querySelector('link[rel="icon"][sizes="32x32"]');
        if (faviconLink) {
            const faviconImg = new Image();
            faviconImg.crossOrigin = 'anonymous';
            faviconImg.src = faviconLink.href;
            faviconImg.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = 32;
                canvas.height = 32;
                const ctx = canvas.getContext('2d');
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                let frame = 0;
                const FPS = 12; // Reduzido de 20: suficiente para percepção suave, menor carga de CPU
                const animate = () => {
                    frame++;
                    ctx.clearRect(0, 0, 32, 32);
                    ctx.save();
                    // Clip circular: previne artefatos de borda quadrada no ícone circular
                    ctx.beginPath();
                    ctx.arc(16, 16, 16, 0, Math.PI * 2);
                    ctx.closePath();
                    ctx.clip();
                    ctx.translate(16, 16);
                    // Oscilação suave: ±5° com easing senoidal
                    const angle = Math.sin(frame * 0.08) * 0.09;
                    ctx.rotate(angle);
                    // Pulse scale: 0.97 → 1.03 (sutil para não clipar o círculo)
                    const scale = 1 + Math.sin(frame * 0.06) * 0.03;
                    ctx.scale(scale, scale);
                    ctx.drawImage(faviconImg, -16, -16, 32, 32);
                    ctx.restore();
                    faviconLink.href = canvas.toDataURL('image/png');
                    if (!document.hidden) {
                        // Respeita preferência de redução de movimento (Epilepsia/Vestibular)
                        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                        if (prefersReduced) { animating = false; return; }
                        setTimeout(() => requestAnimationFrame(animate), 1000 / FPS);
                    } else {
                        animating = false;
                    }
                };
                // Só anima se a aba estiver visível (economia de CPU)
                let animating = false;
                const startIfNotRunning = () => {
                    if (!animating && !document.hidden) {
                        animating = true;
                        animate();
                    }
                };
                startIfNotRunning();
                document.addEventListener('visibilitychange', startIfNotRunning);
            };
        }
    } catch (e) {
        // Safari ou erro de CORS — silencia e mantém favicon estático
    }

    /* ====================================================================== 
       2. Dynamic Neuro-Subtitle Rotator
       Gira frases de efeito raiz com transições suaves para manter atenção.
       ====================================================================== */
    const dynamicSubtitle = document.getElementById('dynamic-subtitle');
    const phrases = [
        "Qualidade e garantia de satisfação! 🚀",
        "O Celtinha rasgando pista pra sua área!",
        "Original nunca se desoriginalizará 🔥",
        "Pronta na mão em 1 minuto! 🍕",
        "Meu pai é o dono, eu sou o sócio 💪"
    ];
    let phraseIndex = 0;

    if (dynamicSubtitle) {
        setInterval(() => {
            // Fade Out
            dynamicSubtitle.style.opacity = 0;
            setTimeout(() => {
                phraseIndex = (phraseIndex + 1) % phrases.length;
                dynamicSubtitle.textContent = phrases[phraseIndex];
                // Fade In
                dynamicSubtitle.style.opacity = 1;
            }, 300); // 300ms invisível pra trocar a frase suavemente
        }, 3500); // Rotação a cada 3.5 segundos
        
        // Setup CSS transition no JS por segurança
        dynamicSubtitle.style.transition = "opacity 0.3s ease-in-out";
    }

    /* ====================================================================== 
       2.5 Universal Navigation Dispatcher (Waze, Uber, GMaps, Apple Maps)
       Mitiga > 12 Edge Cases (WebViews do Instagram/Facebook cortando URI Schemes, 
       Falta de Apps instalados, Double App Quirks, iPads spoofing UserAgent de Mac,
       Escolha livre dos motoristas e Integração API com Uber Moto/Carro).
       ====================================================================== */
    const LAT = -22.869889;   // 22°52'11.6"S = -22.869889
    const LNG = -43.342694;   // 43°20'33.7"W = -43.342694
    const ADDR_NAME = encodeURIComponent('Rei da Pizza');
    const geoBadge = document.getElementById('geo-target-badge');

    if (geoBadge) {
        geoBadge.addEventListener('click', (e) => {
            e.preventDefault();
            if (navigator.vibrate) navigator.vibrate(30);
            
            // Mitigação contra Multi-Touch Race Condition
            if (document.getElementById('nav-overlay-lock')) return;

            const navOverlay = document.createElement('div');
            navOverlay.id = 'nav-overlay-lock';
            navOverlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.7);z-index:999999;display:flex;align-items:flex-end;opacity:0;transition:opacity 0.3s ease;backdrop-filter:blur(4px);';

            const navSheet = document.createElement('div');
            navSheet.style.cssText = 'width:100%;background:#0F0F0F;border-top-left-radius:20px;border-top-right-radius:20px;padding:24px;transform:translateY(100%);transition:transform 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);color:#EDEDED;box-shadow: 0 -10px 40px rgba(255, 42, 0, 0.15);';

            const title = document.createElement('h3');
            title.textContent = '📍 Como você quer chegar?';
            title.style.cssText = 'margin:0 0 20px 0;font-size:1.3rem;text-align:center;font-weight:900;letter-spacing:-0.5px;';
            navSheet.appendChild(title);

            const ua = navigator.userAgent || '';
            const isIOS = /iPhone|iPad|iPod|Macintosh/i.test(ua) && 'ontouchend' in document; // Pega iPadOS 13+ Mask

            const createBtn = (text, icon, url, bg, fg, border = 'none') => {
                const btn = document.createElement('a');
                btn.href = url;
                btn.target = '_blank';
                btn.rel = 'noopener noreferrer';
                btn.style.cssText = `display:flex;align-items:center;justify-content:center;width:100%;padding:16px;margin-bottom:12px;border-radius:12px;background:${bg};color:${fg};text-decoration:none;font-size:1.1rem;font-weight:700;border:${border};transition:transform 0.1s;`;
                btn.innerHTML = `<span style="margin-right:10px;font-size:1.4rem;">${icon}</span> ${text}`;
                btn.onclick = () => closeNav();
                return btn;
            };

            // Universal Links - Bypassa restrições do Webview do Instagram (onde "geo:" morre)
            const uberBtn = createBtn('Pedir Uber', '⬛', `https://m.uber.com/ul/?action=setPickup&dropoff[latitude]=${LAT}&dropoff[longitude]=${LNG}&dropoff[nickname]=${ADDR_NAME}`, '#1A1A1A', '#FFF', '1px solid #333');
            const wazeBtn = createBtn('Waze', '🚙', `https://waze.com/ul?ll=${LAT},${LNG}&navigate=yes`, '#33CCFF', '#000');
            const gmapsBtn = createBtn('Google Maps', '🗺️', `https://www.google.com/maps/search/?api=1&query=${LAT},${LNG}`, '#EAF3FA', '#1A73E8');

            navSheet.appendChild(wazeBtn);
            navSheet.appendChild(uberBtn);
            navSheet.appendChild(gmapsBtn);

            if (isIOS) {
                const appleBtn = createBtn('Apple Maps', '🧭', `https://maps.apple.com/?daddr=${LAT},${LNG}&dirflg=d`, '#2C2C2E', '#0A84FF');
                navSheet.appendChild(appleBtn);
            }

            const cancelBtn = document.createElement('button');
            cancelBtn.textContent = 'Fechar';
            cancelBtn.style.cssText = 'width:100%;padding:14px;background:transparent;border:none;color:#A0A0A0;font-size:1rem;margin-top:8px;cursor:pointer;';
            cancelBtn.onclick = closeNav;
            navSheet.appendChild(cancelBtn);

            navOverlay.appendChild(navSheet);
            document.body.appendChild(navOverlay);

            // Animação UX
            requestAnimationFrame(() => {
                navOverlay.style.opacity = '1';
                navSheet.style.transform = 'translateY(0)';
            });

            navOverlay.onclick = (e) => { if(e.target === navOverlay) closeNav(); };

            function closeNav() {
                navOverlay.style.opacity = '0';
                navSheet.style.transform = 'translateY(100%)';
                setTimeout(() => navOverlay.remove(), 300);
            }
        });
    }

    /* ====================================================================== 
       3. Micro-Cart Engine (Thumb Zone Frictionless com Quantidades)
       * DOM Clobbering Prevented via Strict Element Hooking
       ====================================================================== */
    const thumbZone = document.getElementById('thumb-zone');
    const pizzaActions = document.querySelectorAll('main .pizza-action');
    const totalEl = thumbZone.querySelector('#cart-total') || document.getElementById('cart-total');
    const checkoutBtn = thumbZone.querySelector('#checkout-btn') || document.getElementById('checkout-btn');
    
    /* ====================================================================== 
       2.8 CATÁLOGO IMMUTABLE SERVER-LIKE (Anti-DOM Tampering)
       Preços mantidos em centavos int para evitar falha de precisão Ponto Flutuante
       ====================================================================== */
    const SERVER_CATALOG = Object.freeze({
        'Calabresa (30cm)': 1500,
        'Frango Bolado (30cm)': 1500,
        'Combo do Rei (2 Pizzas + Refri)': 4500,
        'Refri 2L Gelado': 1000
    });

    /* ====================================================================== 
       2.9 DOM HYDRATION (Single Source of Truth)
       Sincroniza os preços do HTML com as regras Hardcoded. Se Marcelo atualizar o JS
       esquecer do HTML (ou vice-versa), o Javascript dita as regras e previne prejuízo.
       ====================================================================== */
    document.querySelectorAll('main .pizza-action').forEach(action => {
        const pizza = action.getAttribute('data-pizza');
        if (SERVER_CATALOG[pizza]) {
            const priceTag = action.parentElement.querySelector('.pizza-price');
            if (priceTag) priceTag.textContent = (SERVER_CATALOG[pizza] / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }
    });

    const upsellLabel = document.querySelector('.upsell-text');
    if (upsellLabel && SERVER_CATALOG['Refri 2L Gelado']) {
        upsellLabel.textContent = `🥤 Adicionar Refri 2L gelado (+${(SERVER_CATALOG['Refri 2L Gelado'] / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })})`;
    }

    // Objeto de estado
    let cart = Object.create(null); // Previne Prototype Pollution no map

    const updateTotal = () => {
        let totalCents = 0;
        let globalItems = 0;
        for (const item in cart) {
            totalCents += cart[item].qty * cart[item].price;
            globalItems += cart[item].qty;
        }
        totalEl.textContent = (totalCents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        
        // Expondo contagem para o escopo
        window.currentGlobalItems = globalItems;

        // Edge Case: Esconde o Footer Preto Float inteiro se carrinho vazio
        if (totalCents === 0) {
            thumbZone.classList.add('hidden-checkout');
        } else {
            thumbZone.classList.remove('hidden-checkout');
            
            // Pulsa o Checkout para guiar o Thumb Zone
            checkoutBtn.style.transform = 'scale(1.05)';
            setTimeout(() => {
                checkoutBtn.style.transform = 'scale(1)';
            }, 200);
        }
    };

    pizzaActions.forEach(action => {
        const descBtn = action.querySelector('.decrement');
        const incBtn = action.querySelector('.increment');
        const countSpan = action.querySelector('.qty-count');

        const pizza = action.getAttribute('data-pizza');
        // Price hardcoded puxado do JS, ignorando adulterações no HTML Tracker
        const price = SERVER_CATALOG[pizza] || 999999; 

        // Inicializa item
        cart[pizza] = { qty: 0, price: price };
        descBtn.classList.add('disabled');

        const updateVisuals = () => {
            // Atualiza a view com Pop Animation Neuromarketing
            const qtySpan = countSpan;
            qtySpan.textContent = cart[pizza].qty;
            
            // Força o reflow para reiniciar a animação CSS imediatamente
            qtySpan.style.animation = 'none';
            qtySpan.offsetHeight; 
            qtySpan.style.animation = 'popNumber 0.25s cubic-bezier(0.18, 0.89, 0.32, 1.28)';

            if(cart[pizza].qty === 0) {
                descBtn.classList.add('disabled');
            } else {
                descBtn.classList.remove('disabled');
            }
            updateTotal();
        };

        const pulseBtn = (btn) => {
            btn.style.transform = 'scale(0.8)';
            btn.style.background = '#FFFFFF';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
                btn.style.background = '';
            }, 150);
        }

        incBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Lógica de Negócio: Limite Global, não apenas por item! (Evita 60 calabrezas)
            if (window.currentGlobalItems >= 15) {
                window.triggerHaptic([30, 30, 30]); // Erro tátil
                alert('Limite máximo de 15 itens atingido.');
                return;
            }
            cart[pizza].qty++;
            updateVisuals();
            pulseBtn(incBtn);
            // Motor Háptico: Vibração curta e forte (Dopamina Tátil)
            window.triggerHaptic(50);
        });

        descBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (cart[pizza].qty > 0) {
                cart[pizza].qty--;
                updateVisuals();
                pulseBtn(descBtn);
                // Motor Háptico: Vibração suave
                window.triggerHaptic(20);
            }
        });
    });

    /* ====================================================================== 
       4. Dark Social Redirector & Tracking (Anti-Referrer Strip)
       Captura UTM da URL -> Local Storage -> Envia pro Zap
       ====================================================================== */
    const extractUTMs = () => {
        let utm_source = 'organico_ou_direto';
        let utm_campaign = 'nenhuma';
        try {
            const params = new URLSearchParams(window.location.search);
            utm_source = (params.get('utm_source') || localStorage.getItem('utm_source') || 'organico_ou_direto').substring(0, 50).replace(/[<>]/g, '');
            utm_campaign = (params.get('utm_campaign') || localStorage.getItem('utm_campaign') || 'nenhuma').substring(0, 50).replace(/[<>]/g, '');
            
            // Salva pra vida útil da sessão
            // [VULN] Em iOS Private Browsing, setItem arremessa DOMException imediato. Try/Catch mitiga o DOS do checkout completo.
            localStorage.setItem('utm_source', utm_source);
            localStorage.setItem('utm_campaign', utm_campaign);
        } catch (e) {
            // Cookie block ou QuotaExceeded ignorado mantendo os fallbacks limpos
        }
        return { utm_source, utm_campaign };
    };

    // Define estado inicial do botão
    updateTotal();
    let checkoutLocked = false; // Debounce anti double-tap

    checkoutBtn.addEventListener('click', () => {
        if (checkoutLocked) return;
        if (thumbZone.classList.contains('hidden-checkout')) {
            window.triggerHaptic([30, 50, 30]);
            checkoutBtn.style.transform = 'translateX(5px)';
            setTimeout(() => checkoutBtn.style.transform = 'translateX(-5px)', 50);
            setTimeout(() => checkoutBtn.style.transform = 'translateX(5px)', 100);
            setTimeout(() => checkoutBtn.style.transform = 'translateX(0)', 150);
            return;
        }
        
        // Populate Checkout Sheet
        const listEl = document.getElementById('checkout-items-list');
        listEl.innerHTML = '';
        let cartTotal = 0;
        
        for (const itemName in cart) {
            if (cart[itemName].qty > 0) {
                const li = document.createElement('li');
                const itemTotalCents = cart[itemName].qty * cart[itemName].price;
                cartTotal += itemTotalCents;
                // [SECURITY] textContent previne XSS via DOM Clobbering em nomes de item
                const nameSpan = document.createElement('span');
                nameSpan.textContent = `${cart[itemName].qty}x ${itemName}`;
                const priceSpan = document.createElement('span');
                priceSpan.textContent = (itemTotalCents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                li.appendChild(nameSpan);
                li.appendChild(priceSpan);
                listEl.appendChild(li);
            }
        }
        
        updateSheetTotal();
        document.getElementById('checkout-sheet-overlay').classList.remove('hidden-sheet');
        document.body.style.overflow = 'hidden';
        
        // Android Back-Button Trap (Evita que fechar o modal feche o Site/PWA)
        history.pushState({ modalOpen: true }, "");
    });

    // Escuta o 'Voltar' do Android/Hardware para fechar modais ao invés do site
    window.addEventListener("popstate", (e) => {
        const sheet = document.getElementById('checkout-sheet-overlay');
        if (sheet && !sheet.classList.contains('hidden-sheet')) {
            sheet.classList.add('hidden-sheet');
            document.body.style.overflow = '';
            if (upsellRefri) upsellRefri.checked = false;
            return;
        }
        // Também cuida do B2B modal
        const b2b = document.getElementById('b2b-modal');
        if (b2b && b2b.classList.contains('active')) {
            b2b.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Fechar Sheet via Botão X (Dispara o recuo do History fake)
    document.getElementById('close-checkout-btn').addEventListener('click', () => {
        document.getElementById('checkout-sheet-overlay').classList.add('hidden-sheet');
        document.body.style.overflow = '';
        // Reset do Upsell ao fechar pra evitar pedido fantasma no próximo open
        if (upsellRefri) upsellRefri.checked = false;
        if (history.state && history.state.modalOpen) {
            history.back(); // Limpa o state que criamos
        }
    });

    // Lógica Upsell
    const upsellRefri = document.getElementById('upsell-refri');
    upsellRefri.addEventListener('change', updateSheetTotal);

    // Scroll Fix para iOS Keyboard
    document.querySelectorAll('.checkout-input').forEach(inp => {
        inp.addEventListener('focus', () => {
            setTimeout(() => inp.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
        });
    });

    function updateSheetTotal() {
        let finalTotalCents = 0;
        for (const itemName in cart) {
            finalTotalCents += cart[itemName].qty * cart[itemName].price;
        }
        if (upsellRefri.checked) finalTotalCents += SERVER_CATALOG['Refri 2L Gelado'];
        document.getElementById('sheet-total').textContent = (finalTotalCents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return finalTotalCents;
    }

    // Lógica UX dos Chips (Logística e Pagamento)
    let selectedLogistics = 'Entrega';
    let selectedPayment = 'Pix';

    const setupChips = (groupId, groupVarSetter, dependecyDivId, showCondition) => {
        const group = document.getElementById(groupId);
        const chips = group.querySelectorAll('.chip');
        const depDiv = document.getElementById(dependecyDivId);
        
        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                chips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                const val = chip.getAttribute('data-value');
                groupVarSetter(val);
                
                if (val === showCondition) {
                    depDiv.classList.remove('hidden-field');
                } else {
                    depDiv.classList.add('hidden-field');
                }
            });
        });
    };

    setupChips('logistics-group', (v) => {
        selectedLogistics = v;
        // Edge Case: Se trocar pra Retirada, limpa campos de endereço pra não poluir a msg do Zap
        if (v === 'Retirada') {
            const cepEl = document.getElementById('customer-cep');
            const addrEl = document.getElementById('customer-address');
            const numEl = document.getElementById('customer-number');
            if (cepEl) cepEl.value = '';
            if (addrEl) addrEl.value = '';
            if (numEl) numEl.value = '';
        }
    }, 'address-group', 'Entrega');
    setupChips('payment-group', (v) => {
        selectedPayment = v;
        // Edge Case: Se trocar de Dinheiro pra outra forma, limpa o campo Troco pra não mandar lixo no Zap
        if (v !== 'Dinheiro') {
            const changeEl = document.getElementById('customer-change');
            if (changeEl) changeEl.value = '';
        }
    }, 'change-group', 'Dinheiro');

    // Lógica ViaCEP
    const cepInput = document.getElementById('customer-cep');
    const btnCep = document.getElementById('buscar-cep-btn');
    const addressInput = document.getElementById('customer-address');
    const numberInput = document.getElementById('customer-number');

    const searchCEP = async () => {
        let cep = cepInput.value.replace(/\D/g, '');
        if (cep.length === 8) {
            btnCep.innerHTML = '<span class="loading-spinner" style="width: 16px; height: 16px; border: 2px solid var(--celta-sub); border-top-color: var(--neuro-warning); border-radius: 50%; animation: spin 1s linear infinite;"></span>';
            
            // AbortController para aniquilar Race Conditions
            if (window.currentCepRequest) {
                window.currentCepRequest.abort();
            }
            window.currentCepRequest = new AbortController();
            const signal = window.currentCepRequest.signal;

            try {
                const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`, { signal });
                const data = await res.json();
                if (!data.erro) {
                    // [VULN FIX] Previne "Keyboard Jumps" que sobem a tela agressivamente.
                    // [VULN FIX] Race Condition: Só sobrescreve se o usuário não começou a digitar a rua na mão.
                    if (document.activeElement !== addressInput) {
                        addressInput.value = [data.logradouro, data.bairro, data.localidade].filter(Boolean).join(', ');
                    }
                    btnCep.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>';

                } else {
                    btnCep.innerHTML = '❌';
                }
            } catch (e) {
                btnCep.innerHTML = '❌';
            }
            setTimeout(() => {
                if (btnCep.innerHTML.includes('❌') || btnCep.innerHTML.includes('svg')) {
                    btnCep.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';
                }
            }, 3000);
        }
    };

    cepInput.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '');
        if (v.length > 5) v = v.replace(/^(\d{5})(\d)/, '$1-$2');
        e.target.value = v;
        if (v.length === 9) searchCEP(); // Auto-search
    });

    btnCep.addEventListener('click', searchCEP);

    // Tática de Segurança para evitar Safari Private Mode LocalStorage Quota DOS
    const safeGetItem = (key) => {
        try { return localStorage.getItem(key); } catch(e) { return null; }
    };
    const safeSetItem = (key, val) => {
        try { localStorage.setItem(key, val); } catch(e) {}
    };

    // Final Checkout -> WhatsApp
    let finalCheckoutLocked = false;
    document.getElementById('final-checkout-btn').addEventListener('click', (e) => {
        if (finalCheckoutLocked) return;
        
        const resetCheckoutState = () => {
            finalCheckoutLocked = false;
            e.target.innerText = 'Enviar Pedido para WhatsApp 📲';
            e.target.style.opacity = '1';
        };

        // [ANTI-BOT] Blacklist Check protegido
        if (safeGetItem('banned_bot') === 'true') {
            return; // Blackhole silencioso
        }

        // [ANTI-BOT DEPRECATED]: O Honeypot trap-field foi neutralizado. Browsers Mobile agressivos 
        // disparam Autofill (Gerenciador de Senhas) no background e bania usuários legítimos!
        // Apenas o Tarpitting (Limites Fisicos) e CORS são efetivos em B2C.

        // [ANTI-DOUBLE-ORDER] Prevenção de pedido duplicado acidental
        const lastOrderTime = parseInt(safeGetItem('lastOrderTimestamp') || '0', 10);
        const orderTimeNow = new Date();
        const timeSinceLastOrder = orderTimeNow.getTime() - lastOrderTime;
        if (timeSinceLastOrder < 60000) { // Menos de 1 minuto desde o último pedido
            const secsLeft = Math.ceil((60000 - timeSinceLastOrder) / 1000);
            window.triggerHaptic([50, 100, 50]);
            alert(`⚠️ Calma chefe! Seu pedido anterior foi enviado há ${secsLeft}s. Aguarde 1 min pra mandar outro.`);
            resetCheckoutState();
            return;
        }

        if (!navigator.onLine) {
            window.triggerHaptic([100, 100, 100]);
            alert('⚠️ Sem Conexão 4G/WiFi!');
            return;
        }
        
        // Block ReEntrancy UI Feedback
        finalCheckoutLocked = true;
        const btnNode = e.target;
        btnNode.innerText = 'Processando...';
        btnNode.style.opacity = '0.7';

        // Horário de Funcionamento Educado (Fricção Gerenciada - Virada de Meia Noite)
        // [BUSINESS LOGIC FIX] O "hour < 18" derrubava pedidos às 00:30 (meia-noite). Pizzarias operam de madruga.
        // O Forno dorme das 02:00 às 17:59.
        const now = new Date();
        const hour = now.getHours();
        if (hour >= 2 && hour < 18) {
            window.triggerHaptic([100, 50, 100]);
            alert('⚠️ Poxa chefe, o forno tá desligado agora! Abrimos às 18h. Pode mandar a mensagem agora pra garantir o 1º lugar da Fila!');
        }

        // Token de Fila (Order ID)
        const orderId = Math.random().toString(36).substring(2, 6).toUpperCase();
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        let orderText = `*[Pedido #${orderId} - ${timeStr}]*\nFala chefe! Quero fazer meu pedido.\n\n`;
        let baseTotalCents = 0;
        let totalItems = 0;
        
        for (const itemName in cart) {
            if (cart[itemName].qty > 0) {
                // Remove formatação pra não ser stripped (Sanitizando aqui!)
                orderText += `${cart[itemName].qty}x ${itemName}\n`;
                baseTotalCents += cart[itemName].qty * cart[itemName].price;
                totalItems += cart[itemName].qty;
            }
        }

        // Tarpitting / Limite Anti-Spam com Desbloqueio (Avoinding DOS forever)
        if (totalItems === 0 || totalItems > 15) {
             window.triggerHaptic([50, 100, 50, 100]);
             alert('⚠️ O carrinho deve conter entre 1 e 15 itens.');
             resetCheckoutState();
             return;
        }

        // Edge Case Combo: Se o cliente já tem o Combo (que inclui Refri), alertar da duplicação
        const hasCombo = cart['Combo do Rei (2 Pizzas + Refri)'] && cart['Combo do Rei (2 Pizzas + Refri)'].qty > 0;
        if (upsellRefri.checked) {
            const refriPrice = SERVER_CATALOG['Refri 2L Gelado'];
            if (hasCombo) {
                orderText += `1x Refri 2L Extra (+ ${(refriPrice / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}) _(Obs: Combo já tem 1 Refri)_\n`;
            } else {
                orderText += `1x Refri 2L Gelado (+ ${(refriPrice / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })})\n`;
            }
            baseTotalCents += refriPrice;
        }
        
        orderText += `\n*Subtotal (Produtos):* ${(baseTotalCents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}\n`;
        
        orderText += `\n📦 *Modo:* ${selectedLogistics}`;
        if (selectedLogistics === 'Entrega') {
            const addr = document.getElementById('customer-address').value.trim().substring(0, 80).replace(/[*_~`<>]/g, '');
            const num = document.getElementById('customer-number').value.trim().substring(0, 60).replace(/[*_~`<>]/g, '');
            const fullAddr = [addr, num].filter(Boolean).join(', ');
            if (!fullAddr) {
                window.triggerHaptic([50, 100, 50]);
                alert('⚠️ Coloca pelo menos a rua/bairro pra o motoboy achar!');
                resetCheckoutState();
                return;
            }
            orderText += `\n📍 *Endereço:* ${fullAddr}`;
            orderText += `\n🛵 _(Taxa do Motoboy combinada no Zap)_`;
        } else {
            orderText += `\n📍 *Local:* Estrada do Portela, 277`;
        }

        orderText += `\n💳 *Pagamento:* ${selectedPayment}`;
        if (selectedPayment === 'Dinheiro') {
            const change = document.getElementById('customer-change').value.trim().substring(0, 15).replace(/[*_~`<>]/g, '');
            if (change) {
                orderText += `\n🪙 *Troco para:* ${change}`;
            } else {
                orderText += `\n🪙 *Troco:* (Cliente não informou. Confirmar trocado!)`;
            }
        } else if (selectedPayment === 'Cartão' && selectedLogistics === 'Entrega') {
            orderText += `\n_(Motoboy: Confirmar Crédito/Débito/VR pra Maquininha)_`;
        }

        // MENSAGENS TÁTICAS (Gestão de Expectativa)
        if (selectedLogistics === 'Retirada') {
            if (selectedPayment === 'Pix') {
                orderText += `\n\n⚠️ *Regras da Casa:* O preparo da sua pizza começa assim que mandar o comprovante do Pix aqui no Zap!`;
            } else {
                orderText += `\n\n⚠️ *Aviso do Balcão:* O preparo começa quando você chegar na loja. Chega no balcão e fala que seu número é o #${orderId}!`;
            }
        } else if (selectedLogistics === 'Entrega') {
            if (selectedPayment === 'Pix') {
                orderText += `\n\n⚠️ *Regras do Celta:* Para o motoboy acelerar, a gente inicia a pizza após o comprovante do Pix.`;
            } else if (selectedPayment === 'Dinheiro') {
                orderText += `\n\n🛵 *Aviso pro Motoboy:* Levar troco na mochila!`;
            }
            // Cartão + Entrega já foi tratado acima (Maquininha)
        }
        
        const tracker = extractUTMs();
        orderText += `\n\n_(LID: ${tracker.utm_source} | CMP: ${tracker.utm_campaign})_`;

        // SANITIZADOR MILITAR REMOVIDO DA STRING COMPLETA
        // Erro de Lógica: Executar replace() global na string de saída DESTRUÍA os bold * injetados!
        // O Whatsapp perdia todo o layout. As sanitizações foram delegadas estritamente para as VÁRIAVEIS do usuário [addr, num, change]

        const safePayload = encodeURIComponent(orderText);
        window.triggerHaptic([100, 50, 100]);
        
        // OMEGA-GATE: Construção Obfuscada (Anti Web-Scrapers regex hunters)
        // 'NTUyMTk2NjI4MTE1Mg==' é Base64 do número puro. Ele só decripta se houver click.
        const omegaToken = atob('NTUyMTk2NjI4MTE1Mg=='); 
        const waLink = `https://wa.me/${omegaToken}?text=${safePayload}`;
        
        setTimeout(() => {
            // Salva timestamp pra Anti-Double-Order
            safeSetItem('lastOrderTimestamp', String(Date.now()));
            // window.open preserva a aba do checkout (location.href destruiria o state se o WhatsApp não abrisse)
            const opened = window.open(waLink, '_blank');
            if (!opened) {
                // Fallback: Se popup bloqueado (iOS WebView), usa redirect direto
                window.location.href = waLink;
            }
            // Libera a ReEntrancy logic apos debounce total
            setTimeout(() => {
                finalCheckoutLocked = false;
                btnNode.innerText = 'Enviar Pedido para WhatsApp 📲';
                btnNode.style.opacity = '1';
            }, 3000);
        }, 150);
    });

    /* ====================================================================== 
       5. B2B Trojan Horse (The Executive Ambush)
       ====================================================================== */
    const b2bTrigger = document.getElementById('b2b-trigger');
    const b2bModal = document.getElementById('b2b-modal');
    const closeB2bBtn = document.getElementById('close-b2b-btn');

    if (b2bTrigger) {
        b2bTrigger.addEventListener('click', () => {
            b2bModal.classList.add('active');
            // Previne scroll da base enquanto lê a oferta
            document.body.style.overflow = 'hidden';
            // History API Trap pra Android Voltar Button não fechar o app
            history.pushState({ b2bOpen: true }, '');
        });
    }

    const closeB2b = () => {
        b2bModal.classList.remove('active');
        document.body.style.overflow = '';
        if (history.state && history.state.b2bOpen) history.back();
    };

    if (closeB2bBtn) closeB2bBtn.addEventListener('click', closeB2b);

    if (b2bModal) {
        b2bModal.addEventListener('click', (e) => {
            if (e.target === b2bModal) {
                closeB2b();
            }
        });
    }

    // ESC fecha o modal B2B (acessibilidade desktop)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Fecha B2B modal
            if (b2bModal && b2bModal.classList.contains('active')) {
                closeB2b();
                return;
            }
            // Fecha Checkout sheet
            const sheet = document.getElementById('checkout-sheet-overlay');
            if (sheet && !sheet.classList.contains('hidden-sheet')) {
                sheet.classList.add('hidden-sheet');
                document.body.style.overflow = '';
                if (upsellRefri) upsellRefri.checked = false;
                if (history.state && history.state.modalOpen) history.back();
            }
        }
    });

    /* ====================================================================== 
       6. OMEGA HANDLERS (Inline onclick → JS puro — Anti-CSP-Violation)
       Migrados do HTML pra cá pra eliminar dependência de 'unsafe-inline' no futuro.
       ====================================================================== */
    // WhatsApp Direct Badge (Social Proof Bar)
    const wppBadge = document.getElementById('wpp-direct-badge');
    if (wppBadge) {
        wppBadge.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'https://wa.me/' + atob('NTUyMTk2NjI4MTE1Mg==');
        });
    }

    // B2B CTA (RET Tecnologia Lead Capture)
    const b2bCta = document.getElementById('b2b-cta-link');
    if (b2bCta) {
        b2bCta.addEventListener('click', (e) => {
            e.preventDefault();
            const retToken = atob('NTUxMTk5MDI0Njg3Nw==');
            const retMsg = encodeURIComponent('Fala RET! Gostei do sistema da pizzaria e quero uma máquina de vendas pro meu negócio.');
            window.location.href = `https://wa.me/${retToken}?text=${retMsg}`;
        });
    }

    // Checkout Overlay — Click fora do sheet fecha (UX padrão Bottom Sheet)
    const checkoutOverlay = document.getElementById('checkout-sheet-overlay');
    if (checkoutOverlay) {
        checkoutOverlay.addEventListener('click', (e) => {
            if (e.target === checkoutOverlay) {
                checkoutOverlay.classList.add('hidden-sheet');
                document.body.style.overflow = '';
                if (upsellRefri) upsellRefri.checked = false;
                if (history.state && history.state.modalOpen) history.back();
            }
        });
    }
});
