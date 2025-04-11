// ===== FUNKTIONEN FÜR DIE NAVIGATION UND DIAGRAMM-INITIALISIERUNG =====
document.addEventListener('DOMContentLoaded', function() {
    // === Referenzen zu Navigation-Buttons
    const navButtons = document.querySelectorAll('.nav-button');
    
    // === Event-Listener für Navigationsbuttons
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Aktiven Button hervorheben
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Alle Abschnitte ausblenden
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => section.style.display = 'none');
            
            // Ausgewählten Abschnitt anzeigen
            const targetSection = document.getElementById(this.getAttribute('data-target'));
            targetSection.style.display = 'block';
            
            // Diagramme neu zeichnen, wenn sie sichtbar werden
            if (this.getAttribute('data-target') === 'growth-charts') {
                window.dispatchEvent(new Event('resize'));
            }
        });
    });
    
    // === Grundlegende Chart.js-Konfiguration für alle Diagramme
    Chart.defaults.color = '#aaa';
    Chart.defaults.borderColor = '#333';
    Chart.defaults.font.family = 'Arial, Helvetica, sans-serif';
    Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(40, 40, 40, 0.9)';
    Chart.defaults.plugins.tooltip.titleColor = '#fff';
    Chart.defaults.plugins.tooltip.bodyColor = '#eee';
    Chart.defaults.plugins.tooltip.borderColor = '#555';
    Chart.defaults.plugins.tooltip.borderWidth = 1;
    Chart.defaults.plugins.tooltip.padding = 10;
    Chart.defaults.plugins.tooltip.cornerRadius = 4;
    
    // === HAUPTGRAPH: EXPONENTIELLES WACHSTUM DER KI-FÄHIGKEITEN ===
    const ctxGrowth = document.getElementById('aiGrowthChart').getContext('2d');
    
    // Jahre für die X-Achse - erweitert für mehr Detailgrad
    const years = [
        1950, 1953, 1956, 1960, 1963, 1966, 1969, 1972, 1975, 
        1978, 1980, 1983, 1985, 1988, 1990, 1993, 1995, 1997, 
        1999, 2000, 2002, 2005, 2008, 2010, 2011, 2012, 2013, 
        2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 
        2023, 2024, 2025
    ];
    
    // Exponentielle Werte für die KI-Entwicklung - mehr Datenpunkte für höhere Präzision
    const aiCapabilityData = [
        1,          // 1950: Turing-Test Konzept
        1.2,        // 1953: Erste Schachprogramme
        1.5,        // 1956: Dartmouth-Konferenz 
        2,          // 1960: Frühe Expertensysteme
        2.5,        // 1963: DENDRAL Expertensystem
        3,          // 1966: ELIZA Chatbot
        3.5,        // 1969: Erster KI-Winter beginnt
        4,          // 1972: MYCIN Expertensystem
        6,          // 1975: Frames-Konzept
        8,          // 1978: Minsky's Frames Paper
        10,         // 1980: Kommerzialisierung der Expertensysteme
        12,         // 1983: PROLOG und LISP Verbreitung
        15,         // 1985: Symbolische KI dominiert
        18,         // 1988: Probabilistische Methoden
        25,         // 1990: Maschinelles Lernen Ansätze
        30,         // 1993: Statistikbasierte NLP
        40,         // 1995: Support Vector Machines
        60,         // 1997: Deep Blue besiegt Kasparov
        80,         // 1999: Fortschritte in Robotik
        100,        // 2000: Millennium-Meilenstein
        150,        // 2002: Bayessche Netze & HMMs
        250,        // 2005: Statistical ML dominiert
        500,        // 2008: ImageNet-Datensatz
        800,        // 2010: Frühe Deep Learning Erfolge
        1200,       // 2011: IBM Watson
        2500,       // 2012: AlexNet Revolution
        5000,       // 2013: Word2Vec
        10000,      // 2014: GANs von Goodfellow
        20000,      // 2015: ResNet und Highway Networks
        40000,      // 2016: AlphaGo besiegt Lee Sedol
        100000,     // 2017: Transformer-Architektur
        250000,     // 2018: BERT, GPT-1
        500000,     // 2019: GPT-2, XLNet
        800000,     // 2020: GPT-3, DALL-E
        2000000,    // 2021: CLIP, DALL-E 2
        5000000,    // 2022: ChatGPT, Stable Diffusion
        10000000,   // 2023: GPT-4, Claude
        18000000,   // 2024: Gemini, Claude Opus
        25000000    // 2025: Grok 3, DeepSeek V3
    ];
    
    // Wichtige Meilensteine für Annotationen
    const annotations = [
        {
            type: 'line',
            scaleID: 'x',
            value: 1956,
            borderColor: 'rgba(255, 99, 132, 0.7)',
            borderWidth: 2,
            label: {
                content: 'Dartmouth-Konferenz',
                enabled: true,
                position: 'top',
                backgroundColor: 'rgba(255, 99, 132, 0.7)',
                font: { weight: 'bold' }
            }
        },
        {
            type: 'line',
            scaleID: 'x',
            value: 1997,
            borderColor: 'rgba(255, 205, 86, 0.7)',
            borderWidth: 2,
            label: {
                content: 'Deep Blue',
                enabled: true,
                position: 'top',
                backgroundColor: 'rgba(255, 205, 86, 0.7)',
                font: { weight: 'bold' }
            }
        },
        {
            type: 'line',
            scaleID: 'x',
            value: 2012,
            borderColor: 'rgba(75, 192, 192, 0.7)',
            borderWidth: 2,
            label: {
                content: 'AlexNet',
                enabled: true,
                position: 'top',
                backgroundColor: 'rgba(75, 192, 192, 0.7)',
                font: { weight: 'bold' }
            }
        },
        {
            type: 'line',
            scaleID: 'x',
            value: 2017,
            borderColor: 'rgba(153, 102, 255, 0.7)',
            borderWidth: 2,
            label: {
                content: 'Transformer',
                enabled: true,
                position: 'top',
                backgroundColor: 'rgba(153, 102, 255, 0.7)',
                font: { weight: 'bold' }
            }
        },
        {
            type: 'line',
            scaleID: 'x',
            value: 2022,
            borderColor: 'rgba(255, 99, 132, 0.7)',
            borderWidth: 2,
            label: {
                content: 'ChatGPT',
                enabled: true,
                position: 'top',
                backgroundColor: 'rgba(255, 99, 132, 0.7)',
                font: { weight: 'bold' }
            }
        }
    ];
    
    // Erstellung des exponentiellen Wachstumsgraphen mit präziser Konfiguration
    new Chart(ctxGrowth, {
        type: 'line',
        data: {
            labels: years,
            datasets: [{
                label: 'KI-Leistungsfähigkeit (relativ)',
                data: aiCapabilityData,
                backgroundColor: 'rgba(110, 142, 251, 0.2)',
                borderColor: 'rgba(110, 142, 251, 1)',
                pointBackgroundColor: function(context) {
                    // Hervorhebung wichtiger Meilensteine mit unterschiedlichen Farben
                    const index = context.dataIndex;
                    const year = years[index];
                    if (year === 1956) return 'rgba(255, 99, 132, 1)';  // Dartmouth
                    if (year === 1966) return 'rgba(255, 159, 64, 1)';  // ELIZA
                    if (year === 1997) return 'rgba(255, 205, 86, 1)';  // Deep Blue
                    if (year === 2012) return 'rgba(75, 192, 192, 1)';  // AlexNet
                    if (year === 2017) return 'rgba(153, 102, 255, 1)'; // Transformer
                    if (year === 2022) return 'rgba(255, 99, 132, 1)';  // ChatGPT
                    return 'rgba(167, 119, 227, 1)';
                },
                pointBorderColor: '#222',
                pointBorderWidth: 2,
                pointRadius: function(context) {
                    // Größere Punkte für wichtige Meilensteine
                    const index = context.dataIndex;
                    const year = years[index];
                    if ([1956, 1966, 1997, 2012, 2017, 2022].includes(year)) {
                        return 8;
                    }
                    return 4;
                },
                fill: true,
                tension: 0.2,
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.8, // Präzises Seitenverhältnis für optimale Darstellung
            interaction: {
                mode: 'nearest',
                intersect: false,
                axis: 'x'
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#eee',
                        font: {
                            size: 14,
                            weight: 'bold'
                        },
                        padding: 15
                    }
                },
                annotation: {
                    annotations: annotations
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let value = context.raw;
                            const year = years[context.dataIndex];
                            let label = '';
                            
                            // Spezifische Labels für wichtige Meilensteine
                            if (year === 1956) label = 'Dartmouth-Konferenz: ';
                            if (year === 1966) label = 'ELIZA Chatbot: ';
                            if (year === 1997) label = 'Deep Blue besiegt Kasparov: ';
                            if (year === 2012) label = 'AlexNet/Deep Learning Revolution: ';
                            if (year === 2017) label = 'Transformer-Architektur: ';
                            if (year === 2022) label = 'ChatGPT Revolution: ';
                            
                            // Formatierung großer Zahlen mit Präzision
                            if (value >= 1000000) {
                                return label + `${(value/1000000).toFixed(2)} Millionen`;
                            } else if (value >= 1000) {
                                return label + `${(value/1000).toFixed(2)}k`;
                            } else {
                                return label + `${value.toFixed(1)}`;
                            }
                        },
                        title: function(context) {
                            const year = context[0].label;
                            // Ergänzende Informationen für wichtige Jahre
                            const yearInfo = {
                                '1956': 'Geburtsstunde der KI',
                                '1966': 'Frühe Chatbot-Technologie',
                                '1997': 'KI im Schach triumphiert',
                                '2012': 'Beginn der Deep Learning Ära',
                                '2017': 'Revolution in NLP',
                                '2022': 'Generative KI wird Mainstream',
                                '2025': 'Fortschritte in Richtung AGI'
                            };
                            return yearInfo[year] ? `${year} - ${yearInfo[year]}` : year;
                        }
                    }
                }
            },
            scales: {
                y: {
                    type: 'logarithmic', // Logarithmische Skala für exponentielles Wachstum
                    min: 1,
                    max: 30000000,
                    grid: {
                        color: 'rgba(90, 90, 90, 0.2)',
                        borderColor: '#555'
                    },
                    title: {
                        display: true,
                        text: 'KI-Leistungsfähigkeit (logarithmisch)',
                        color: '#ddd',
                        font: {
                            size: 14,
                            weight: 'bold'
                        },
                        padding: {top: 5, bottom: 10}
                    },
                    ticks: {
                        color: '#ddd',
                        font: {
                            size: 12
                        },
                        callback: function(value) {
                            const values = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 25000000];
                            if (values.includes(value)) {
                                if (value >= 1000000) {
                                    return `${value/1000000}M`;
                                } else if (value >= 1000) {
                                    return `${value/1000}k`;
                                }
                                return value;
                            }
                            return '';
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(90, 90, 90, 0.2)',
                        borderColor: '#555'
                    },
                    title: {
                        display: true,
                        text: 'Jahr',
                        color: '#ddd',
                        font: {
                            size: 14,
                            weight: 'bold'
                        },
                        padding: {top: 10, bottom: 5}
                    },
                    ticks: {
                        color: '#ddd',
                        font: {
                            size: 12
                        },
                        maxRotation: 45,
                        minRotation: 45,
                        callback: function(value, index) {
                            // Nur bestimmte Jahre anzeigen, um Überfüllung zu vermeiden
                            const majorYears = [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2017, 2022, 2025];
                            return majorYears.includes(value) ? value : '';
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
    
    // === MODELLGRÖSSEN-GRAPH ===
    const ctxModelSize = document.getElementById('modelSizeChart').getContext('2d');
    
    // Detaillierte Modell-Timeline mit mehr Einträgen
    const modelYears = [
        2001, 2003, 2005, 2008, 2010, 2013, 2015, 2017, 
        2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025
    ];
    
    // Größen der Modelle in Millionen Parametern
    const modelSizes = [
        0.01,       // 2001: Frühe neuronale Netze (10 Tausend)
        0.05,       // 2003: Verbesserte Modelle (50 Tausend)
        0.1,        // 2005: Fortgeschrittene Modelle (100 Tausend)
        0.5,        // 2008: Frühe Deep Learning (500 Tausend)
        1,          // 2010: Erste Deep Learning Modelle (1 Million)
        2,          // 2013: Word2Vec (2 Millionen)
        10,         // 2015: BERT erste Version (10 Millionen)
        110,        // 2017: Transformer Paper (110 Millionen)
        300,        // 2018: BERT-Large, GPT-2 (300 Millionen)
        1500,       // 2019: GPT-2 XL, T5 (1,5 Milliarden)
        175000,     // 2020: GPT-3 (175 Milliarden)
        280000,     // 2021: Gopher (280 Milliarden)
        540000,     // 2022: PaLM (540 Milliarden)
        1500000,    // 2023: Claude 2, GPT-4 (~1,5 Billionen geschätzt)
        671000,     // 2024: DeepSeek V3 (671 Milliarden in MoE)
        1800000     // 2025: Gemini Ultra 2 (1,8 Billionen)
    ];
    
    // Modellnamen für detaillierte Beschriftungen
    const modelNames = [
        "Frühe neuronale Netze",
        "Verbesserte frühe Modelle",
        "Erste moderne ML-Modelle",
        "Frühe Deep Learning",
        "Erste tiefe neuronale Netze",
        "Word2Vec",
        "Early BERT",
        "Transformer Paper",
        "BERT-Large, GPT-2",
        "GPT-2 XL, T5",
        "GPT-3",
        "Gopher",
        "PaLM",
        "Claude 2, GPT-4",
        "DeepSeek V3 MoE",
        "Gemini Ultra 2"
    ];
    
    new Chart(ctxModelSize, {
        type: 'line',
        data: {
            labels: modelYears,
            datasets: [{
                label: 'Modellgröße (Parameter)',
                data: modelSizes,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 3,
                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                pointBorderColor: '#222',
                pointBorderWidth: 2,
                pointRadius: 6,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.5,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let value = context.raw;
                            const index = context.dataIndex;
                            let formattedValue;
                            
                            if (value >= 1000000) {
                                formattedValue = `${(value/1000000).toFixed(2)} Billionen Parameter`;
                            } else if (value >= 1000) {
                                formattedValue = `${(value/1000).toFixed(2)} Milliarden Parameter`;
                            } else {
                                formattedValue = `${value} Millionen Parameter`;
                            }
                            
                            return `${modelNames[index]}: ${formattedValue}`;
                        },
                        title: function(context) {
                            return `Jahr: ${context[0].label}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    type: 'logarithmic',
                    min: 0.01,
                    title: {
                        display: true,
                        text: 'Modellgröße (Parameter)',
                        color: '#ddd',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        callback: function(value) {
                            if (value >= 1000000) {
                                return `${value/1000000}T`;
                            } else if (value >= 1000) {
                                return `${value/1000}G`;
                            } else if (value < 1) {
                                return `${value*1000}K`;
                            }
                            return `${value}M`;
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Jahr',
                        color: '#ddd',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        maxRotation: 45
                    }
                }
            },
            animation: {
                duration: 2000
            }
        }
    });
    
    // === FORSCHUNGSPUBLIKATIONEN-GRAPH ===
    const ctxResearch = document.getElementById('researchChart').getContext('2d');
    
    // Erweiterte Jahresdaten für Forschungspublikationen
    const researchYears = [
        1990, 1992, 1994, 1996, 1998, 2000, 2002, 2004, 2006, 2008, 
        2010, 2012, 2014, 2016, 2018, 2020, 2021, 2022, 2023, 2024, 2025
    ];
    
    // Publikationsdaten mit wichtigen Meilensteinen
    const publicationData = [
        500,      // 1990
        750,      // 1992
        900,      // 1994
        1200,     // 1996
        1800,     // 1998
        2000,     // 2000: Millennium-Schwelle
        3500,     // 2002
        6000,     // 2004
        8500,     // 2006
        12000,    // 2008: ImageNet veröffentlicht
        18000,    // 2010
        25000,    // 2012: AlexNet Revolution
        45000,    // 2014: GANs vorgestellt
        85000,    // 2016: AlphaGo besiegt Lee Sedol
        130000,   // 2018: BERT, GPT-1
        210000,   // 2020: GPT-3 veröffentlicht
        260000,   // 2021: DALL-E, CLIP
        310000,   // 2022: ChatGPT, Diffusion Models
        400000,   // 2023: GPT-4, multimodale Modelle
        450000,   // 2024: Fortschritte in Richtung AGI
        520000    // 2025: Prognose
    ];
    
    // Milestones für die Annotation
    const researchAnnotations = [
        {
            type: 'line',
            scaleID: 'x',
            value: 2012,
            borderColor: 'rgba(75, 192, 192, 0.7)',
            borderWidth: 2,
            label: {
                content: 'AlexNet',
                enabled: true,
                position: 'start',
                backgroundColor: 'rgba(75, 192, 192, 0.7)',
                font: { weight: 'bold' }
            }
        },
        {
            type: 'line',
            scaleID: 'x',
            value: 2022,
            borderColor: 'rgba(255, 99, 132, 0.7)',
            borderWidth: 2,
            label: {
                content: 'ChatGPT',
                enabled: true,
                position: 'start',
                backgroundColor: 'rgba(255, 99, 132, 0.7)',
                font: { weight: 'bold' }
            }
        }
    ];
    
    new Chart(ctxResearch, {
        type: 'bar',
        data: {
            labels: researchYears,
            datasets: [{
                label: 'KI-Publikationen pro Jahr',
                data: publicationData,
                backgroundColor: function(context) {
                    const index = context.dataIndex;
                    const year = researchYears[index];
                    // Hervorhebung wichtiger Jahre
                    if (year === 2012) return 'rgba(75, 192, 192, 0.8)';
                    if (year === 2016) return 'rgba(153, 102, 255, 0.8)';
                    if (year === 2020) return 'rgba(255, 205, 86, 0.8)';
                    if (year === 2022) return 'rgba(255, 99, 132, 0.8)';
                    return 'rgba(153, 102, 255, 0.6)';
                },
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.5,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                annotation: {
                    annotations: researchAnnotations
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            const year = researchYears[context.dataIndex];
                            const events = {
                                2008: "ImageNet-Datensatz veröffentlicht",
                                2012: "AlexNet revolutioniert Computer Vision",
                                2014: "GANs werden vorgestellt",
                                2016: "AlphaGo besiegt Lee Sedol",
                                2018: "BERT und GPT-1 veröffentlicht",
                                2020: "GPT-3 demonstriert emergente Fähigkeiten",
                                2022: "ChatGPT wird der Öffentlichkeit zugänglich",
                                2023: "GPT-4 und multimodale Modelle"
                            };
                            let info = `${value.toLocaleString()} Publikationen`;
                            if (events[year]) {
                                info += ` - ${events[year]}`;
                            }
                            return info;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Anzahl der Publikationen',
                        color: '#ddd',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        callback: function(value) {
                            return value >= 1000 ? `${value/1000}k` : value;
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Jahr',
                        color: '#ddd',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        maxRotation: 45
                    }
                }
            },
            animation: {
                duration: 2000,
                delay: function(context) {
                    return context.dataIndex * 50;
                }
            }
        }
    });
    
    // === RECHENAUFWAND-GRAPH ===
    const ctxCompute = document.getElementById('computeChart').getContext('2d');
    
    // Detailliertere Daten zum Rechenaufwand für KI-Training
    const computeYears = [
        2012, 2014, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025
    ];
    
    const computeData = [
        10,           // 2012: AlexNet
        50,           // 2014: Frühes Deep Learning
        500,          // 2016: AlphaGo
        5000,         // 2017: Transformer
        50000,        // 2018: BERT, GPT-1
        150000,       // 2019: GPT-2
        355000,       // 2020: GPT-3
        1200000,      // 2021: Jurassic-1, Megatron-Turing NLG
        2500000,      // 2022: PaLM, Chinchilla, Claude 1
        15000000,     // 2023: GPT-4, Claude 2
        60000000,     // 2024: DeepSeek V3, Claude 3
        200000000     // 2025: Grok 3, Gemini Ultra 2
    ];
    
    // Energieverbrauch in MWh
    const energyData = [
        0.03,          // 2012
        0.15,          // 2014
        1.5,           // 2016
        15,            // 2017
        150,           // 2018
        450,           // 2019
        1287,          // 2020
        3500,          // 2021
        5760,          // 2022
        34200,         // 2023
        136800,        // 2024
        456000         // 2025
    ];
    
    new Chart(ctxCompute, {
        type: 'line',
        data: {
            labels: computeYears,
            datasets: [
                {
                    label: 'GPU-Stunden für Training',
                    data: computeData,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                    pointBorderColor: '#222',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    fill: true,
                    yAxisID: 'y',
                    tension: 0.3
                },
                {
                    label: 'Energieverbrauch (MWh)',
                    data: energyData,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                    pointBorderColor: '#222',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    fill: true,
                    yAxisID: 'y1',
                    tension: 0.3,
                    hidden: true // Standardmäßig ausgeblendet, kann über Legende aktiviert werden
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.5,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const datasetIndex = context.datasetIndex;
                            const value = context.raw;
                            const year = computeYears[context.dataIndex];
                            
                            // Modellnamen für bekannte Jahre
                            const modelNames = {
                                2012: "AlexNet",
                                2016: "AlphaGo",
                                2017: "Transformer",
                                2018: "BERT, GPT-1",
                                2019: "GPT-2",
                                2020: "GPT-3",
                                2022: "PaLM, Chinchilla",
                                2023: "GPT-4",
                                2024: "DeepSeek V3",
                                2025: "Grok 3"
                            };
                            
                            let modelInfo = modelNames[year] ? ` (${modelNames[year]})` : '';
                            
                            if (datasetIndex === 0) { // GPU-Stunden
                                if (value >= 1000000) {
                                    return `GPU-Stunden${modelInfo}: ${(value/1000000).toFixed(2)} Millionen`;
                                } else if (value >= 1000) {
                                    return `GPU-Stunden${modelInfo}: ${(value/1000).toFixed(2)}k`;
                                } else {
                                    return `GPU-Stunden${modelInfo}: ${value}`;
                                }
                            } else { // Energieverbrauch
                                if (value >= 1000) {
                                    return `Energieverbrauch${modelInfo}: ${(value/1000).toFixed(2)} GWh`;
                                } else {
                                    return `Energieverbrauch${modelInfo}: ${value} MWh`;
                                }
                            }
                        }
                    }
                }
            },
            scales: {
                y: {
                    type: 'logarithmic',
                    min: 10,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'GPU-Stunden (logarithmisch)',
                        color: '#ddd',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        callback: function(value) {
                            if (value >= 1000000) {
                                return `${value/1000000}M`;
                            } else if (value >= 1000) {
                                return `${value/1000}k`;
                            } 
                            return value;
                        }
                    }
                },
                y1: {
                    type: 'logarithmic',
                    min: 0.01,
                    position: 'right',
                    grid: {
                        drawOnChartArea: false
                    },
                    title: {
                        display: true,
                        text: 'Energieverbrauch (MWh)',
                        color: '#ddd',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        callback: function(value) {
                            if (value >= 1000) {
                                return `${value/1000}GWh`;
                            }
                            return `${value}MWh`;
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Jahr',
                        color: '#ddd',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                }
            },
            animation: {
                duration: 2000
            }
        }
    });
    
    // === KI-BENCHMARK-PERFORMANCE GRAPH ===
    const ctxBenchmark = document.getElementById('benchmarkChart').getContext('2d');
    
    // Erweiterte Benchmark-Jahre
    const benchmarkYears = [
        2018, 2019, 2020, 2021, 2022.25, 2022.5, 2022.75, 2023.25, 2023.5, 2023.75, 2024.25, 2024.5, 2024.75, 2025
    ];
    
    // Erweiterte Benchmark-Daten mit MMLU Scores
    const mmluScores = [
        54.0,     // 2018: BERT-Large
        64.3,     // 2019: RoBERTa
        70.0,     // 2020: GPT-3
        73.5,     // 2021: Chinchilla
        76.2,     // 2022.25: LaMDA
        79.3,     // 2022.5: PaLM
        80.5,     // 2022.75: Chinchilla
        84.2,     // 2023.25: LLaMA 2
        86.4,     // 2023.5: GPT-4
        87.3,     // 2023.75: Claude 2
        87.9,     // 2024.25: Claude 3 Opus
        90.1,     // 2024.5: Claude 3.5 Sonnet
        92.5,     // 2024.75: Gemini 1.5 Pro
        93.7      // 2025: Gemini Ultra 2
    ];
    
    // Labels mit Modellnamen für bessere Übersicht
    const benchmarkLabels = [
        "2018\nBERT-Large", 
        "2019\nRoBERTa", 
        "2020\nGPT-3", 
        "2021\nChinchilla", 
        "Q1 2022\nLaMDA", 
        "Q2 2022\nPaLM", 
        "Q3 2022\nChinchilla Pro", 
        "Q1 2023\nLLaMA 2",
        "Q2 2023\nGPT-4", 
        "Q3 2023\nClaude 2", 
        "Q1 2024\nClaude 3 Opus", 
        "Q2 2024\nClaude 3.5", 
        "Q3 2024\nGemini 1.5", 
        "2025\nGemini Ultra 2"
    ];
    
    // Anmerkung für menschliche Experten-Performance
    const humanExpertScore = 89.8;
    
    // Annotationen für wichtige Schwellen
    const benchmarkAnnotations = [
        {
            type: 'line',
            scaleID: 'y',
            value: humanExpertScore,
            borderColor: 'rgba(255, 159, 64, 0.7)',
            borderWidth: 2,
            borderDash: [5, 5],
            label: {
                content: 'Menschlicher Experte (89.8%)',
                enabled: true,
                position: 'left',
                backgroundColor: 'rgba(255, 159, 64, 0.7)',
                color: 'white',
                font: { 
                    weight: 'bold',
                    size: 12
                }
            }
        }
    ];
    
    new Chart(ctxBenchmark, {
        type: 'line',
        data: {
            labels: benchmarkLabels,
            datasets: [{
                label: 'MMLU Score (%)',
                data: mmluScores,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 3,
                pointBackgroundColor: function(context) {
                    const value = context.raw;
                    return value > humanExpertScore ? 'rgba(75, 192, 192, 1)' : 'rgba(54, 162, 235, 1)';
                },
                pointBorderColor: '#222',
                pointBorderWidth: 2,
                pointRadius: function(context) {
                    const value = context.raw;
                    return value > humanExpertScore ? 10 : 6;
                },
                pointStyle: function(context) {
                    const value = context.raw;
                    return value > humanExpertScore ? 'star' : 'circle';
                },
                fill: {
                    target: 'origin',
                    above: 'rgba(54, 162, 235, 0.2)',
                    below: 'rgba(54, 162, 235, 0.1)'
                },
                tension: 0.3
            }, {
                label: 'Menschlicher Experte',
                data: Array(benchmarkYears.length).fill(humanExpertScore),
                borderColor: 'rgba(255, 159, 64, 1)',
                borderDash: [5, 5],
                borderWidth: 2,
                pointStyle: 'star',
                pointRadius: 8,
                pointBackgroundColor: 'rgba(255, 159, 64, 1)',
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.5,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                annotation: {
                    annotations: benchmarkAnnotations
                },
                tooltip: {
                    callbacks: {
                        title: function(context) {
                            return context[0].label.replace('\n', ' - ');
                        },
                        label: function(context) {
                            const datasetIndex = context.datasetIndex;
                            const value = context.raw;
                            
                            if (datasetIndex === 0) {
                                let performance = '';
                                if (value > humanExpertScore) {
                                    performance = ' (übertrifft menschliche Experten)';
                                } else if (value > 85) {
                                    performance = ' (nahe menschlicher Experten)';
                                } else if (value > 75) {
                                    performance = ' (fortgeschrittene Fähigkeiten)';
                                } else if (value > 65) {
                                    performance = ' (mittlere Fähigkeiten)';
                                } else {
                                    performance = ' (grundlegende Fähigkeiten)';
                                }
                                return `MMLU Score: ${value.toFixed(1)}%${performance}`;
                            } else {
                                return `Menschlicher Experte: ${value}%`;
                            }
                        }
                    }
                }
            },
            scales: {
                y: {
                    min: 50,
                    max: 95,
                    title: {
                        display: true,
                        text: 'MMLU Score (%)',
                        color: '#ddd',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Modelle nach Erscheinungsdatum',
                        color: '#ddd',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45,
                        padding: 5,
                        autoSkip: false
                    }
                }
            },
            animation: {
                duration: 2000
            }
        }
    });
    
    // === TRAININGSEFFIZIENZ-GRAPH ===
    const ctxEfficiency = document.getElementById('efficiencyChart').getContext('2d');
    
    // Detailliertere Daten zur Trainingseffizienz
    const efficiencyYears = [
        2018, 2019, 2020, 2021, 2022, 2023, 2023.5, 2024, 2024.5, 2025
    ];
    
    const efficiencyData = [
        10,      // 2018: Frühe Modelle
        12,      // 2019: Verbesserte Modelle
        15,      // 2020: GPT-3
        18,      // 2021: Jurassic-1
        20,      // 2022: PaLM, Chinchilla
        35,      // 2023: Claude 2
        50,      // 2023.5: LLaMA 2
        85,      // 2024: DeepSeek V3
        70,      // 2024.5: Claude Opus 3
        65       // 2025: Gemini Ultra 2, Grok 3
    ];
    
    // Modellnamen für Beschriftungen
    const efficiencyLabels = [
        "2018\nFrühe Modelle",
        "2019\nVerb. Modelle",
        "2020\nGPT-3",
        "2021\nJurassic-1",
        "2022\nPaLM/Chinchilla",
        "2023 Q1\nClaude 2",
        "2023 Q3\nLLaMA 2",
        "2024 Q1\nDeepSeek V3",
        "2024 Q3\nClaude Opus 3",
        "2025\nGemini/Grok"
    ];
    
    new Chart(ctxEfficiency, {
        type: 'bar',
        data: {
            labels: efficiencyLabels,
            datasets: [{
                label: 'Tokens pro Parameter',
                data: efficiencyData,
                backgroundColor: function(context) {
                    const value = context.raw;
                    // Farbverlauf basierend auf Effizienz
                    if (value > 80) return 'rgba(75, 192, 192, 0.8)'; // Sehr effizient
                    if (value > 50) return 'rgba(75, 192, 192, 0.6)';
                    if (value > 25) return 'rgba(255, 205, 86, 0.7)';
                    return 'rgba(255, 205, 86, 0.5)';
                },
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.5,
            indexAxis: 'x',
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        title: function(context) {
                            return context[0].label.replace('\n', ' - ');
                        },
                        label: function(context) {
                            const value = context.raw;
                            
                            let efficiency = '';
                            if (value > 80) {
                                efficiency = ' (bahnbrechende Effizienz)';
                            } else if (value > 50) {
                                efficiency = ' (hohe Effizienz)';
                            } else if (value > 20) {
                                efficiency = ' (durchschnittliche Effizienz)';
                            } else {
                                efficiency = ' (grundlegende Effizienz)';
                            }
                            
                            return `Tokens pro Parameter: ${value}${efficiency}`;
                        },
                        afterLabel: function(context) {
                            const index = context.dataIndex;
                            const details = [
                                "Frühe Optimierungsansätze",
                                "Verbessertes Training mit besseren Optimizern",
                                "GPT-3 mit Adam Optimizer",
                                "Jurassic-1 mit verbessertem Datenfiltering",
                                "Chinchilla zeigte optimale Skalierung von Parametern zu Tokens",
                                "Claude 2 mit fortschrittlichem RLHF",
                                "LLaMA 2 mit hochwertigen Trainingsdaten",
                                "DeepSeek V3 mit bahnbrechender MoE-Architektur",
                                "Claude Opus 3 mit Fokus auf Qualität statt Quantität",
                                "Grok 3 und Gemini Ultra 2 mit fortgeschrittener Trainingsmethodik"
                            ];
                            return details[index];
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: 90,
                    title: {
                        display: true,
                        text: 'Tokens pro Parameter',
                        color: '#ddd',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Modelle & Trainingsmethoden',
                        color: '#ddd',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            },
            animation: {
                duration: 2000,
                delay: function(context) {
                    return context.dataIndex * 100;
                }
            }
        }
    });
    
    // === KONTEXTLÄNGE-GRAPH ===
    const ctxContext = document.getElementById('contextChart').getContext('2d');
    
    // Erweiterte Daten zur Kontextlängenentwicklung
    const contextYears = [
        2018, 2019, 2020, 2021, 2022, 2022.5, 2023, 2023.5, 2024, 2024.5, 2025
    ];
    
    const contextData = [
        2048,       // 2018: GPT-2, frühe Transformer
        2048,       // 2019: BERT, RoBERTa
        4096,       // 2020: GPT-3
        8192,       // 2021: Jurassic-1
        32768,      // 2022: PaLM
        64000,      // 2022.5: LLaMA, GPT-3.5
        100000,     // 2023: Claude 2
        128000,     // 2023.5: GPT-4 Turbo
        200000,     // 2024: Claude 3 Opus
        1000000,    // 2024.5: Claude 3.5
        2000000     // 2025: GPT-4.5 Turbo
    ];
    
    // Modelle für Labels
    const contextLabels = [
        "2018\nGPT-2",
        "2019\nBERT",
        "2020\nGPT-3",
        "2021\nJurassic-1",
        "2022 Q1\nPaLM",
        "2022 Q3\nLLaMA",
        "2023 Q1\nClaude 2",
        "2023 Q3\nGPT-4 Turbo",
        "2024 Q1\nClaude 3 Opus",
        "2024 Q3\nClaude 3.5",
        "2025\nGPT-4.5 Turbo"
    ];
    
    // Annotationen für wichtige Meilensteine
    const contextAnnotations = [
        {
            type: 'line',
            scaleID: 'y',
            value: 1000000,
            borderColor: 'rgba(255, 99, 132, 0.7)',
            borderWidth: 2,
            borderDash: [5, 5],
            label: {
                content: '1 Million Tokens Schwelle',
                enabled: true,
                position: 'start',
                backgroundColor: 'rgba(255, 99, 132, 0.7)',
                font: { weight: 'bold' }
            }
        }
    ];
    
    new Chart(ctxContext, {
        type: 'line',
        data: {
            labels: contextLabels,
            datasets: [{
                label: 'Kontextfenster (Tokens)',
                data: contextData,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                pointBackgroundColor: function(context) {
                    const value = context.raw;
                    if (value >= 1000000) return 'rgba(255, 99, 132, 1)';
                    if (value >= 100000) return 'rgba(255, 205, 86, 1)';
                    return 'rgba(75, 192, 192, 1)';
                },
                pointBorderColor: '#222',
                pointBorderWidth: 2,
                pointRadius: function(context) {
                    const value = context.raw;
                    if (value >= 1000000) return 10;
                    if (value >= 100000) return 8;
                    return 6;
                },
                pointStyle: function(context) {
                    const value = context.raw;
                    if (value >= 1000000) return 'star';
                    return 'circle';
                },
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.5,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                annotation: {
                    annotations: contextAnnotations
                },
                tooltip: {
                    callbacks: {
                        title: function(context) {
                            return context[0].label.replace('\n', ' - ');
                        },
                        label: function(context) {
                            let value = context.raw;
                            let formattedValue;
                            
                            if (value >= 1000000) {
                                formattedValue = `${(value/1000000).toFixed(2)} Millionen Tokens`;
                            } else if (value >= 1000) {
                                formattedValue = `${(value/1000).toFixed(0)}k Tokens`;
                            } else {
                                formattedValue = `${value} Tokens`;
                            }
                            
                            // Kontext zur Bedeutung
                            let contextMeaning = '';
                            if (value >= 1000000) {
                                contextMeaning = '\nKann ganze Bücher auf einmal verarbeiten';
                            } else if (value >= 100000) {
                                contextMeaning = '\nKann lange Dokumente analysieren';
                            } else if (value >= 10000) {
                                contextMeaning = '\nKann mehrere Seiten verarbeiten';
                            } else if (value >= 2000) {
                                contextMeaning = '\nKann etwa eine Seite Text verarbeiten';
                            }
                            
                            return `Kontextlänge: ${formattedValue}${contextMeaning}`;
                        },
                        afterLabel: function(context) {
                            const index = context.dataIndex;
                            const anwendungen = [
                                "Grundlegende Textverarbeitung, kurze Antworten",
                                "Verständnis von kurzen Absätzen, einfache Q&A",
                                "Mehrseitige Dokumente, erweiterte Antworten",
                                "Längere Gespräche, Zusammenfassungen von Artikeln",
                                "Technische Dokumentationen, Codeanalyse",
                                "Komplexe Dialoge, wissenschaftliche Paper",
                                "Große Datensätze, umfangreiche Analysen",
                                "Lange Rechtsdokumente, Codebases",
                                "Vollständige wissenschaftliche Arbeiten mit Zitaten",
                                "Mehrere Bücher gleichzeitig, Langzeit-Dialoge",
                                "Ganze Bibliotheken, historische Archive"
                            ];
                            return `Typische Anwendungen: ${anwendungen[index]}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    type: 'logarithmic',
                    min: 1000,
                    title: {
                        display: true,
                        text: 'Kontextfenster (Tokens)',
                        color: '#ddd',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        callback: function(value) {
                            if (value >= 1000000) {
                                return `${value/1000000}M`;
                            } else if (value >= 1000) {
                                return `${value/1000}k`;
                            }
                            return value;
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Modelle nach Jahr',
                        color: '#ddd',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            },
            animation: {
                duration: 2000
            }
        }
    });
    
    // Event-Listener für Größenanpassung
    window.addEventListener('resize', function() {
        const charts = document.querySelectorAll('canvas');
        charts.forEach(chart => {
            if (chart.chart) {
                chart.chart.resize();
            }
        });
    });
    
    // Initialisierungsfunktion, um Chart-Objekte an Canvas-Elemente zu binden
    function attachChartReferences() {
        const charts = document.querySelectorAll('canvas');
        charts.forEach(canvas => {
            if (Chart.getChart(canvas)) {
                canvas.chart = Chart.getChart(canvas);
            }
        });
    }
    
    // Nach der Erstellung aller Diagramme aufrufen
    attachChartReferences();
});

// Funktion zum Umschalten zwischen den KI-Phasen
function switchPhase(phaseNumber) {
    // Alle Knoten deaktivieren
    const nodes = document.querySelectorAll('.evolution-node');
    nodes.forEach(node => {
        node.classList.remove('active');
    });
    
    // Ausgewählten Knoten aktivieren
    const selectedNode = document.querySelector(`.evolution-node[data-phase="${phaseNumber}"]`);
    selectedNode.classList.add('active');
    
    // Alle Detail-Bereiche ausblenden
    const details = document.querySelectorAll('.evolution-detail');
    details.forEach(detail => {
        detail.classList.remove('active');
        detail.style.display = 'none';
    });
    
    // Ausgewählten Detail-Bereich anzeigen mit Animation
    const selectedDetail = document.querySelector(`.evolution-detail[data-phase="${phaseNumber}"]`);
    selectedDetail.classList.add('active');
    
    // Fade-In-Animation
    selectedDetail.style.opacity = 0;
    selectedDetail.style.display = 'block';
    
    // Sanfte Einblendeanimation
    setTimeout(() => {
        selectedDetail.style.transition = 'opacity 0.5s ease-in-out';
        selectedDetail.style.opacity = 1;
    }, 50);
}

// Initialisierung: Stellen Sie sicher, dass die erste Phase beim Laden angezeigt wird
document.addEventListener('DOMContentLoaded', function() {
    // Diese Funktion wird aktiv, wenn der Phasen-Reiter angeklickt wird
    const phasesButton = document.querySelector('button[data-target="phases-section"]');
    if (phasesButton) {
        phasesButton.addEventListener('click', function() {
            // Stelle sicher, dass die erste Phase beim Öffnen des Reiters sichtbar ist
            setTimeout(() => {
                switchPhase(1);
            }, 100);
        });
    }
    
    // Optional: Füge Click-Handler zu allen Phasen-Knoten hinzu (falls onclick im HTML nicht funktioniert)
    const phaseNodes = document.querySelectorAll('.evolution-node');
    phaseNodes.forEach(node => {
        node.addEventListener('click', function() {
            const phase = this.getAttribute('data-phase');
            switchPhase(parseInt(phase));
        });
    });
});

// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menü erstellen
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.setAttribute('aria-label', 'Menü öffnen');
    mobileMenuToggle.innerHTML = '<span class="bar"></span><span class="bar"></span><span class="bar"></span>';
    document.body.appendChild(mobileMenuToggle);
    
    // Mobile Nav Container erstellen
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    
    // Kopiere Navigationspunkte
    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach(button => {
        const mobileNavButton = document.createElement('button');
        mobileNavButton.className = 'mobile-nav-button';
        mobileNavButton.setAttribute('data-target', button.getAttribute('data-target'));
        
        // Icon abhängig vom Zielbereich hinzufügen
        let icon = 'fa-chart-line'; // Standard
        if (button.getAttribute('data-target') === 'timeline-section') icon = 'fa-history';
        if (button.getAttribute('data-target') === 'models-section') icon = 'fa-brain';
        if (button.getAttribute('data-target') === 'phases-section') icon = 'fa-project-diagram';
        if (button.getAttribute('data-target') === 'trends-section') icon = 'fa-chart-bar';
        if (button.getAttribute('data-target') === 'benchmarks-section') icon = 'fa-tachometer-alt';
        
        mobileNavButton.innerHTML = `<i class="fas ${icon}"></i> ${button.textContent}`;
        mobileNav.appendChild(mobileNavButton);
        
        // Event-Listener hinzufügen
        mobileNavButton.addEventListener('click', function() {
            // Aktiven Button setzen
            document.querySelectorAll('.mobile-nav-button').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Zielbereich anzeigen
            const targetId = this.getAttribute('data-target');
            document.querySelectorAll('.section').forEach(section => section.style.display = 'none');
            document.getElementById(targetId).style.display = 'block';
            
            // Mobile Menü schließen
            mobileNav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
            
            // Charts neu zeichnen
            window.dispatchEvent(new Event('resize'));
        });
    });
    
    // Schließen-Button hinzufügen
    const closeButton = document.createElement('button');
    closeButton.className = 'mobile-nav-close';
    closeButton.setAttribute('aria-label', 'Menü schließen');
    closeButton.innerHTML = '<i class="fas fa-times"></i>';
    mobileNav.appendChild(closeButton);
    
    document.body.appendChild(mobileNav);
    
    // Event-Listener für Toggle-Button
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Event-Listener für Schließen-Button
    closeButton.addEventListener('click', function() {
        mobileNav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
    
    // Auch Klicks außerhalb schließen das Menü
    document.addEventListener('click', function(event) {
        if (!mobileNav.contains(event.target) && !mobileMenuToggle.contains(event.target) && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
});

