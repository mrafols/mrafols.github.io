// Language switcher functionality
const translations = {        'message-placeholder': 'Cuéntame sobre tu proyecto u oportunidad...',
        'send-message': 'Enviar Mensaje',
        'form-trouble': '¿Problemas con el formulario?',
        'email-directly': 'Escríbeme directamente',es: {
        // Header
        'portfolio': 'Marc Portfolio',
        'about': 'Acerca de',
        'experience': 'Experiencia',
        'contact': 'Contacto',
        
        // Index page
        'hero-title': 'Hola, soy Marc',
        'hero-subtitle': 'Site Reliability Engineer | DevOps',
        'hero-description': 'Especializado en infraestructura cloud, automatización y arquitecturas escalables. Con más de 15 años de experiencia en tecnología.',
        'about-me': 'Acerca de mí',
        'about-description': 'Soy un Site Reliability Engineer con más de 15 años de experiencia en tecnología, especializado en infraestructura cloud, DevOps y arquitecturas escalables. Actualmente trabajo en Leadtech Group, donde lidero iniciativas de migración a la nube y implementación de prácticas DevSecOps.',
        'experience-passion': 'Mi pasión por la tecnología me ha llevado a trabajar en empresas innovadoras como Social Point, Incubio, y Qustodio, donde he gestionado infraestructuras que soportan millones de usuarios. También tengo experiencia docente, habiendo sido profesor en Monlau y la UPC.',
        'skills-title': 'Habilidades Técnicas',
        'view-experience': 'Ver Experiencia Completa',
        'contact-me': 'Contáctame',        // Personal Information
        'birthday': 'Cumpleaños:',
        'website': 'Sitio Web:',
        'city': 'Ciudad:',
        'age': 'Edad:',
        'degree': 'Titulación:',
        'email': 'Email:',
        
        // Personal Values
        'birthday-value': '21 Diciembre 1986',
        'city-value': 'Menorca, España',
        'degree-value': 'Interacción Multimedia y Digital',
        
        // Skills
        'cloud-infrastructure': 'Infraestructura Cloud',
        'devops-automation': 'DevOps y Automatización',
        'monitoring-observability': 'Monitoreo y Observabilidad',
        'containerization': 'Contenedorización',
        'iac': 'Infrastructure as Code',
        'cicd': 'CI/CD Pipelines',
        
        // Experience page
        'professional-experience': 'Experiencia Profesional',
        'current-role': 'Site Reliability Engineer | DevOps',
        'present': 'Presente',
        'months': 'meses',
        'years': 'años',
        'year': 'año',
        'month': 'mes',
        'full-time': 'Tiempo completo',
        'freelance': 'Freelance',
        'training-contract': 'Contrato de formación',
        'remote': 'Remoto',
          // Contact page
        'contact-title': 'Contáctame',
        'contact-subtitle': 'Estoy disponible para nuevas oportunidades y colaboraciones',
        'contact-info': 'Información de Contacto',
        'contact-email': 'Email',
        'contact-location': 'Ubicación',
        'contact-availability': 'Disponibilidad',
        'contact-availability-value': 'Abierto a oportunidades remotas',
        'connect-with-me': 'Conéctate conmigo',
        'get-in-touch': 'Ponte en Contacto',
        'contact-intro': '¿Listo para colaborar? ¡Me encantaría saber de ti!',
        'send-email': 'Enviar Email',
        'typical-response': 'Tiempo de respuesta típico: 24-48 horas',
        
        // Footer
        'copyright': '© 2024 Marc Ràfols Ibáñez. Todos los derechos reservados.',
        
        // Job descriptions
        'leadtech-desc-1': 'Diseño y gestión de infraestructura cloud usando AWS, Terraform y CloudFormation, implementando prácticas de Infrastructure as Code.',
        'leadtech-desc-2': 'Lidero la migración a Serverless Computing para mejorar escalabilidad y reducir costos operativos en un 30%.',
        'leadtech-desc-3': 'Implemento pipelines CI/CD usando Jenkins y GitHub Actions, reduciendo tiempo de despliegue en un 60%.',
        'leadtech-desc-4': 'Colaboro con equipos de desarrollo implementando prácticas DevSecOps para mejorar seguridad y calidad del software.',
        
        'monlau-corp-desc-1': 'Imparto cursos de certificación oficial en cloud computing, particularmente Azure y AWS.',
        'monlau-corp-desc-2': 'Mentorizo y guío estudiantes en las últimas prácticas y tecnologías de la industria.',
        'monlau-corp-desc-3': 'Desarrollo y actualizo materiales de curso sobre Serverless Computing, CI/CD y metodologías DevOps.',
        'monlau-corp-desc-4': 'Asesoro estudiantes en proyectos de investigación y desarrollo profesional.',
        
        'monlau-prof-desc-1': 'Enseñé a estudiantes de 16-20 años sistemas operativos (Linux, Windows), desarrollo web y protocolos de red.',
        'monlau-prof-desc-2': 'Implementé metodologías ágiles en el aula, aumentando la participación estudiantil en un 40%.',
        'monlau-prof-desc-3': 'Desarrollé y actualicé el currículum para mantenerlo actualizado con tendencias y mejores prácticas de la industria.',
        'monlau-prof-desc-4': 'Mentoricé estudiantes, proporcionando orientación para ayudarles a tener éxito en sus estudios y carreras.',
        'monlau-prof-desc-5': 'Organicé talleres técnicos con profesionales de la industria para enriquecer la experiencia de aprendizaje.',
        
        'fhios-desc-1': 'Facilité ceremonias Scrum (planificación de sprints, daily stand-ups y retrospectivas) para equipos de desarrollo distribuidos.',
        'fhios-desc-2': 'Eliminé impedimentos del equipo y mejoré la comunicación entre departamentos, aumentando productividad en un 25%.',
        'fhios-desc-3': 'Reduje el tiempo promedio de resolución para bugs críticos en un 40% implementando prácticas de integración continua.',
        'fhios-desc-4': 'Colaboré con el Product Owner en priorización de funcionalidades y gestión del product backlog.',
        'fhios-desc-5': 'Organicé sesiones de formación en metodologías ágiles para equipos multidisciplinarios.',
        
        'mediacloud-desc-1': 'Lideré la implementación exitosa de múltiples proyectos de infraestructura en entorno de nube privada usando tecnologías OpenStack.',
        'mediacloud-desc-2': 'Gestioné presupuestos de proyecto superiores a €500,000, siempre entregando a tiempo y dentro del presupuesto.',
        'mediacloud-desc-3': 'Desarrollé y mantuve relaciones sólidas con stakeholders clave, incluyendo clientes y proveedores.',
        'mediacloud-desc-4': 'Coordiné equipos multidisciplinarios de hasta 15 personas para el desarrollo e implementación de soluciones cloud.',
        'mediacloud-desc-5': 'Diseñé e implementé estrategias de migración cloud para clientes en los sectores de medios y entretenimiento.',
        
        'upc-desc-1': 'Diseñé y impartí cursos completos sobre tecnologías Big Data incluyendo Hadoop, Spark y bases de datos NoSQL.',
        'upc-desc-2': 'Desarrollé talleres prácticos y laboratorios hands-on para que estudiantes ganaran experiencia real con herramientas de analítica de datos.',
        'upc-desc-3': 'Mentoricé estudiantes en proyectos de fin de carrera involucrando procesamiento de datos a gran escala e implementaciones de machine learning.',
        'upc-desc-4': 'Colaboré con socios de la industria para asegurar alineación del currículum con demandas y tecnologías actuales del mercado.',
        
        'incubio-desc-1': 'Lideré un equipo de ingenieros DevOps implementando metodologías ágiles que mejoraron la eficiencia en un 35%.',
        'incubio-desc-2': 'Diseñé arquitecturas cloud-native para más de 15 startups, adaptadas a diferentes escalas y necesidades.',
        'incubio-desc-3': 'Reduje costos de infraestructura en un 40% a través de optimización de recursos AWS y auto-scaling.',
        'incubio-desc-4': 'Creé sistemas de automatización con Puppet, permitiendo que nuevos entornos estuvieran operacionales en menos de 2 horas.',
        
        'socialpoint-desc-1': 'Diseñé e implementé pipelines CI/CD que redujeron tiempos de despliegue en un 75%, habilitando múltiples releases diarios.',
        'socialpoint-desc-2': 'Gestioné infraestructura AWS para juegos sociales con más de 10 millones de usuarios activos mensuales.',
        'socialpoint-desc-3': 'Desarrollé sistemas de alta disponibilidad para bases de datos que soportaron picos de 500,000 usuarios concurrentes.',
        'socialpoint-desc-4': 'Implementé monitoreo integral con dashboards en tiempo real que mejoraron los tiempos de respuesta a incidentes.',
        'socialpoint-desc-5': 'Lideré la migración de monolito a microservicios, mejorando escalabilidad y reduciendo costos operativos.',
        
        'hornetsecurity-desc-1': 'Gestioné y optimicé infraestructura de seguridad de email basada en Linux sirviendo a más de 50,000 clientes empresariales.',
        'hornetsecurity-desc-2': 'Implementé soluciones avanzadas anti-spam y anti-malware, reduciendo falsos positivos en un 60%.',
        'hornetsecurity-desc-3': 'Automaticé procesos de monitoreo del sistema y alertas, mejorando tiempo de respuesta a incidentes en un 45%.',
        'hornetsecurity-desc-4': 'Colaboré con equipos de desarrollo para optimizar algoritmos de filtrado de email y mejorar rendimiento del sistema.',
        
        'privalia-desc-1': 'Gestioné servidores Linux y Windows y supervisé procesos de backup del sistema y recuperación ante desastres.',
        'privalia-desc-2': 'Automaticé despliegue y gestión de configuración.',
        'privalia-desc-3': 'Implementé y gestioné virtualización usando VMware e Hyper-V.',
        'privalia-desc-4': 'Mejoré rendimiento y confiabilidad del sistema a través de mantenimiento regular y actualizaciones.',
        'privalia-desc-5': 'Colaboré con equipos de desarrollo para apoyar el despliegue y escalado de aplicaciones.',
        
        'ecoburo-desc-1': 'Proporcioné soporte técnico para sistemas Windows y Linux en un entorno empresarial pequeño.',
        'ecoburo-desc-2': 'Mantuve infraestructura de red incluyendo routers, switches y puntos de acceso inalámbrico.',
        'ecoburo-desc-3': 'Implementé soluciones de backup y realicé tareas regulares de mantenimiento del sistema.',
        'ecoburo-desc-4': 'Asistí con instalaciones de software, actualizaciones y gestión de cuentas de usuario.',
        
        'saboredo-desc-1': 'Comencé carrera gestionando infraestructura IT básica y proporcionando soporte a usuarios finales en entorno corporativo.',
        'saboredo-desc-2': 'Aprendí habilidades fundamentales de administración de sistemas incluyendo gestión de usuarios y troubleshooting básico de red.',
        'saboredo-desc-3': 'Asistí con instalaciones de hardware, despliegues de software y backups del sistema.',
        'saboredo-desc-4': 'Gané experiencia fundamental en administración de Windows Server y gestión de Active Directory.'
    },
    en: {
        // Header
        'portfolio': 'Marc Portfolio',
        'about': 'About',
        'experience': 'Experience',
        'contact': 'Contact',
        
        // Index page
        'hero-title': 'Hi, I\'m Marc',
        'hero-subtitle': 'Site Reliability Engineer | DevOps',
        'hero-description': 'Specialized in cloud infrastructure, automation, and scalable architectures. With over 15 years of experience in technology.',
        'about-me': 'About Me',
        'about-description': 'I am a Site Reliability Engineer with over 15 years of experience in technology, specializing in cloud infrastructure, DevOps, and scalable architectures. Currently working at Leadtech Group, where I lead cloud migration initiatives and DevSecOps practices implementation.',
        'experience-passion': 'My passion for technology has led me to work at innovative companies like Social Point, Incubio, and Qustodio, where I have managed infrastructures supporting millions of users. I also have teaching experience, having been a professor at Monlau and UPC.',
        'skills-title': 'Technical Skills',
        'view-experience': 'View Full Experience',
        'contact-me': 'Contact Me',          // Personal Information
        'birthday': 'Birthday:',
        'website': 'Website:',
        'city': 'City:',
        'age': 'Age:',
        'degree': 'Degree:',
        'email': 'Email:',
        
        // Personal Values
        'birthday-value': '21 December 1986',
        'city-value': 'Menorca, Spain',
        'degree-value': 'Multimedia & Digital Interaction',
        
        // Skills
        'cloud-infrastructure': 'Cloud Infrastructure',
        'devops-automation': 'DevOps & Automation',
        'monitoring-observability': 'Monitoring & Observability',
        'containerization': 'Containerization',
        'iac': 'Infrastructure as Code',
        'cicd': 'CI/CD Pipelines',
        
        // Experience page
        'professional-experience': 'Professional Experience',
        'current-role': 'Site Reliability Engineer | DevOps',
        'present': 'Present',
        'months': 'months',
        'years': 'years',
        'year': 'year',
        'month': 'month',
        'full-time': 'Full-time',
        'freelance': 'Freelance',
        'training-contract': 'Training Contract',
        'remote': 'Remote',
          // Contact page
        'contact-title': 'Contact Me',
        'contact-subtitle': 'I\'m available for new opportunities and collaborations',
        'contact-info': 'Contact Information',
        'contact-email': 'Email',
        'contact-location': 'Location',
        'contact-availability': 'Availability',
        'contact-availability-value': 'Open to remote opportunities',
        'connect-with-me': 'Connect with me',
        'get-in-touch': 'Get in Touch',
        'contact-intro': 'Ready to collaborate? I\'d love to hear from you!',
        'send-email': 'Send Email',
        'typical-response': 'Typical response time: 24-48 hours',
        
        // Footer
        'copyright': '© 2024 Marc Ràfols Ibáñez. All rights reserved.',
        
        // Job descriptions
        'leadtech-desc-1': 'Design and manage cloud infrastructure using AWS, Terraform, and CloudFormation, implementing Infrastructure as Code practices.',
        'leadtech-desc-2': 'Lead the migration to Serverless Computing to improve scalability and reduce operational costs by 30%.',
        'leadtech-desc-3': 'Implement CI/CD pipelines using Jenkins and GitHub Actions, reducing deployment time by 60%.',
        'leadtech-desc-4': 'Collaborate with development teams implementing DevSecOps practices to enhance security and software quality.',
        
        'monlau-corp-desc-1': 'Teach official certification courses in cloud computing, particularly Azure and AWS.',
        'monlau-corp-desc-2': 'Mentor and guide students in the latest industry practices and technologies.',
        'monlau-corp-desc-3': 'Develop and update course materials on Serverless Computing, CI/CD, and DevOps methodologies.',
        'monlau-corp-desc-4': 'Advise students on research projects and professional development.',
        
        'monlau-prof-desc-1': 'Taught students aged 16-20 in operating systems (Linux, Windows), web development, and network protocols.',
        'monlau-prof-desc-2': 'Implemented agile methodologies in the classroom, increasing student participation by 40%.',
        'monlau-prof-desc-3': 'Developed and updated the curriculum to keep it current with industry trends and best practices.',
        'monlau-prof-desc-4': 'Mentored students, providing guidance to help them succeed in their studies and careers.',
        'monlau-prof-desc-5': 'Organized technical workshops with industry professionals to enrich the learning experience.',
        
        'fhios-desc-1': 'Facilitated Scrum ceremonies (sprint planning, daily stand-ups, and retrospectives) for distributed development teams.',
        'fhios-desc-2': 'Eliminated team impediments and improved communication between departments, increasing productivity by 25%.',
        'fhios-desc-3': 'Reduced average resolution time for critical bugs by 40% by implementing continuous integration practices.',
        'fhios-desc-4': 'Collaborated with the Product Owner on feature prioritization and product backlog management.',
        'fhios-desc-5': 'Organized training sessions on agile methodologies for multidisciplinary teams.',
        
        'mediacloud-desc-1': 'Led the successful implementation of multiple infrastructure projects in a private cloud environment using OpenStack technologies.',
        'mediacloud-desc-2': 'Managed project budgets exceeding €500,000, always delivering on time and within budget.',
        'mediacloud-desc-3': 'Developed and maintained strong relationships with key stakeholders, including clients and vendors.',
        'mediacloud-desc-4': 'Coordinated multidisciplinary teams of up to 15 people for the development and implementation of cloud solutions.',
        'mediacloud-desc-5': 'Designed and implemented cloud migration strategies for clients in the media and entertainment sectors.',
        
        'upc-desc-1': 'Designed and delivered comprehensive courses on Big Data technologies including Hadoop, Spark, and NoSQL databases.',
        'upc-desc-2': 'Developed practical workshops and hands-on labs for students to gain real-world experience with data analytics tools.',
        'upc-desc-3': 'Mentored students on capstone projects involving large-scale data processing and machine learning implementations.',
        'upc-desc-4': 'Collaborated with industry partners to ensure curriculum alignment with current market demands and technologies.',
        
        'incubio-desc-1': 'Led a team of DevOps engineers implementing agile methodologies that improved efficiency by 35%.',
        'incubio-desc-2': 'Designed cloud-native architectures for over 15 startups, tailored to different scales and needs.',
        'incubio-desc-3': 'Reduced infrastructure costs by 40% through AWS resource optimization and auto-scaling.',
        'incubio-desc-4': 'Created automation systems with Puppet, enabling new environments to be operational in less than 2 hours.',
        
        'socialpoint-desc-1': 'Designed and implemented CI/CD pipelines that reduced deployment times by 75%, enabling multiple daily releases.',
        'socialpoint-desc-2': 'Managed AWS infrastructure for social games with over 10 million monthly active users.',
        'socialpoint-desc-3': 'Developed high availability systems for databases that supported peaks of 500,000 concurrent users.',
        'socialpoint-desc-4': 'Implemented comprehensive monitoring with real-time dashboards that improved incident response times.',
        'socialpoint-desc-5': 'Led the migration from monolith to microservices, improving scalability and reducing operational costs.',
        
        'hornetsecurity-desc-1': 'Managed and optimized Linux-based email security infrastructure serving over 50,000 business clients.',
        'hornetsecurity-desc-2': 'Implemented advanced anti-spam and anti-malware solutions, reducing false positives by 60%.',
        'hornetsecurity-desc-3': 'Automated system monitoring and alerting processes, improving incident response time by 45%.',
        'hornetsecurity-desc-4': 'Collaborated with development teams to optimize email filtering algorithms and improve system performance.',
        
        'privalia-desc-1': 'Managed Linux and Windows servers and oversaw system backups and disaster recovery processes.',
        'privalia-desc-2': 'Automated deployment and configuration management.',
        'privalia-desc-3': 'Implemented and managed virtualization using VMware and Hyper-V.',
        'privalia-desc-4': 'Improved system performance and reliability through regular maintenance and updates.',
        'privalia-desc-5': 'Collaborated with development teams to support the deployment and scaling of applications.',
        
        'ecoburo-desc-1': 'Provided technical support for Windows and Linux systems in a small business environment.',
        'ecoburo-desc-2': 'Maintained network infrastructure including routers, switches, and wireless access points.',
        'ecoburo-desc-3': 'Implemented backup solutions and performed regular system maintenance tasks.',
        'ecoburo-desc-4': 'Assisted with software installations, updates, and user account management.',
        
        'saboredo-desc-1': 'Started career managing basic IT infrastructure and providing end-user support in a corporate environment.',
        'saboredo-desc-2': 'Learned fundamental system administration skills including user management and basic network troubleshooting.',
        'saboredo-desc-3': 'Assisted with hardware installations, software deployments, and system backups.',
        'saboredo-desc-4': 'Gained foundational experience in Windows Server administration and Active Directory management.'
    }
};

let currentLanguage = localStorage.getItem('language') || 'en';

function translateElement(element, key) {
    try {
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = translations[currentLanguage][key];
            } else if (element.placeholder !== undefined) {
                element.placeholder = translations[currentLanguage][key];
            } else {
                element.textContent = translations[currentLanguage][key];
            }
        } else {
            console.warn(`Translation key "${key}" not found for language "${currentLanguage}"`);
        }
    } catch (error) {
        console.error(`Error translating element with key "${key}":`, error);
    }
}

function translatePage() {
    try {
        // Translate all elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (key) {
                translateElement(element, key);
            }
        });
        
        // Update language switcher active state
        document.querySelectorAll('.language-switcher button').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === currentLanguage) {
                btn.classList.add('active');
            }
        });
        
        // Update page lang attribute
        document.documentElement.lang = currentLanguage;
    } catch (error) {
        console.error('Error during page translation:', error);
    }
}

function switchLanguage(lang) {
    try {
        if (translations[lang]) {
            currentLanguage = lang;
            localStorage.setItem('language', lang);
            translatePage();
            
            // Announce to screen readers
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.className = 'sr-only';
            announcement.textContent = `Language changed to ${lang === 'es' ? 'Spanish' : 'English'}`;
            document.body.appendChild(announcement);
            setTimeout(() => document.body.removeChild(announcement), 1000);
        } else {
            console.error(`Language "${lang}" not supported`);
        }
    } catch (error) {
        console.error(`Error switching to language "${lang}":`, error);
    }
}

// Initialize translation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        translatePage();
        
        // Add event listeners to language switcher buttons
        document.querySelectorAll('.language-switcher button').forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                const lang = this.getAttribute('data-lang');
                if (lang) {
                    switchLanguage(lang);
                }
            });
        });
    } catch (error) {
        console.error('Error initializing language functionality:', error);
    }
});