<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jacob Holman - Full-stack Developer</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        .profile-card {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            border-radius: 20px;
            padding: 40px;
            max-width: 800px;
            margin: 20px auto;
            color: #e0e6ed;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
            position: relative;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .profile-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
            pointer-events: none;
        }
        
        .profile-header {
            text-align: center;
            margin-bottom: 35px;
            position: relative;
            z-index: 1;
        }
        
        .profile-header h1 {
            font-size: 2.8rem;
            font-weight: 700;
            margin-bottom: 10px;
            background: linear-gradient(45deg, #ffffff, #64ffda);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .profile-header .title {
            font-size: 1.4rem;
            font-weight: 400;
            color: #64ffda;
            opacity: 0.8;
            margin-bottom: 20px;
        }
        
        .website-link {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: #e0e6ed;
            text-decoration: none;
            background: rgba(100, 255, 218, 0.1);
            padding: 12px 24px;
            border-radius: 30px;
            font-weight: 500;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(100, 255, 218, 0.3);
        }
        
        .website-link:hover {
            background: rgba(100, 255, 218, 0.2);
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(100, 255, 218, 0.2);
            border-color: rgba(100, 255, 218, 0.5);
        }
        
        .website-link::before {
        }
        
        .skills-section {
            position: relative;
            z-index: 1;
        }
        
        .skills-section h3 {
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 15px;
            text-align: center;
            color: #e0e6ed;
            opacity: 0.9;
        }
        
        .tech-section {
            margin-bottom: 30px;
        }
        
        .tech-section:last-child {
            margin-bottom: 0;
        }
        
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            gap: 12px;
            max-width: 600px;
            margin: 0 auto;
        }
        
        .skill-tag {
            background: rgba(255, 255, 255, 0.05);
            padding: 12px 16px;
            border-radius: 12px;
            text-align: center;
            font-weight: 500;
            font-size: 0.9rem;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            cursor: default;
            color: #b8c5d1;
        }
        
        .skill-tag:hover {
            background: rgba(100, 255, 218, 0.1);
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 8px 20px rgba(100, 255, 218, 0.15);
            border-color: rgba(100, 255, 218, 0.3);
            color: #64ffda;
        }
        
        .decorative-elements {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            overflow: hidden;
        }
        
        .decorative-elements::before,
        .decorative-elements::after {
            content: '';
            position: absolute;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background: rgba(100, 255, 218, 0.03);
        }
        
        .decorative-elements::before {
            top: -100px;
            right: -100px;
        }
        
        .decorative-elements::after {
            bottom: -100px;
            left: -100px;
            width: 150px;
            height: 150px;
        }
        
        @media (max-width: 768px) {
            .profile-card {
                padding: 30px 20px;
                margin: 10px;
            }
            
            .profile-header h1 {
                font-size: 2.2rem;
            }
            
            .profile-header .title {
                font-size: 1.2rem;
            }
            
            .skills-grid {
                grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
                gap: 10px;
            }
            
            .skill-tag {
                padding: 10px 12px;
                font-size: 0.8rem;
            }
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        .profile-card:hover .decorative-elements::before {
            animation: float 6s ease-in-out infinite;
        }
        
        .profile-card:hover .decorative-elements::after {
            animation: float 8s ease-in-out infinite reverse;
        }
    </style>
</head>
<body>
    <div class="profile-card">
        <div class="decorative-elements"></div>
        
        <div class="profile-header">
            <h1>Jacob Holman</h1>
            <p class="title">Full-stack Developer</p>
            <a href="https://jacobholman.dev/" class="website-link" target="_blank" rel="noopener noreferrer">
                jacobholman.dev
            </a>
        </div>
        
        <div class="skills-section">
            <div class="tech-section">
                <h3>Languages</h3>
                <div class="skills-grid">
                    <div class="skill-tag">JavaScript</div>
                    <div class="skill-tag">TypeScript</div>
                    <div class="skill-tag">Java</div>
                    <div class="skill-tag">Python</div>
                    <div class="skill-tag">C</div>
                    <div class="skill-tag">C++</div>
                    <div class="skill-tag">C#</div>
                    <div class="skill-tag">Go</div>
                    <div class="skill-tag">Kotlin</div>
                    <div class="skill-tag">Lua</div>
                </div>
            </div>
            
            <div class="tech-section">
                <h3>Frontend & Frameworks</h3>
                <div class="skills-grid">
                    <div class="skill-tag">React</div>
                    <div class="skill-tag">Next.js</div>
                    <div class="skill-tag">HTML</div>
                    <div class="skill-tag">CSS</div>
                    <div class="skill-tag">Tailwind CSS</div>
                </div>
            </div>
            
            <div class="tech-section">
                <h3>Backend & Tools</h3>
                <div class="skills-grid">
                    <div class="skill-tag">Node.js</div>
                    <div class="skill-tag">Express</div>
                    <div class="skill-tag">MySQL</div>
                    <div class="skill-tag">Docker</div>
                    <div class="skill-tag">Git</div>
                    <div class="skill-tag">AWS</div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
