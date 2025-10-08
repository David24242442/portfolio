import { Component, ViewChild, ElementRef, OnInit, HostListener, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


interface NavItem {
  name: string;
  section: string;
}

interface Project {
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
}

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit, OnDestroy {
  @ViewChild('profile') profileSection!: ElementRef;
  @ViewChild('about') aboutSection!: ElementRef;
  @ViewChild('experience') experienceSection!: ElementRef;
  // FIXED: Renamed to 'projectsSection' to avoid conflict with array 'projects'
 @ViewChild('projectsSection') projectsSection!: ElementRef;
  @ViewChild('contact') contactSection!: ElementRef;

  isMenuOpen = false;
  isLoading = true;
  isScrolled = false;
  scrollProgress = 0;
  sectionInView = 'profile';
  showBackToTop = false;

  navItems: NavItem[] = [
    { name: 'About', section: 'about' },
    { name: 'Experience', section: 'experience' },
    { name: 'Projects', section: 'projects' },
    { name: 'Contact', section: 'contact' }
  ];

  // ENSURED: Explicitly typed as Project[] (array, not HTMLElement)
 projects: Project[] = [
  {
    title: 'E-Commerce Analytics Dashboard',
    description: 'Real-time sales analytics dashboard with predictive modeling for inventory management and customer behavior analysis.',
    image: 'assets/images/project-1.png',
    category: 'Data Visualization',
    technologies: ['Power BI', 'Python', 'SQL', 'Azure'],
    githubUrl: 'https://github.com/David24242442/',
    liveUrl: '#'
  },
  {
    title: 'Customer Churn Prediction',
    description: 'Machine learning model to predict customer churn with 92% accuracy, including interactive visualization dashboard.',
    image: 'assets/images/project-2.png',
    category: 'Machine Learning',
    technologies: ['Python', 'Scikit-learn', 'Tableau', 'PostgreSQL'],
    githubUrl: 'https://github.com/David24242442/',
    liveUrl: '#'
  },
  {
    title: 'Financial Data Pipeline',
    description: 'Automated ETL pipeline for processing financial transactions with real-time anomaly detection and reporting.',
    image: 'assets/images/project-3.png',
    category: 'Data Engineering',
    technologies: ['Python', 'Apache Airflow', 'MongoDB', 'Docker'],
    githubUrl: 'https://github.com/David24242442/',
    liveUrl: '#'
  }
];

 experiences = [
  {
    title: 'Data Analyst',
    company: 'Generation Ghana',
    duration: 'Jan 2024 – Present',
    expanded: false,
    responsibilities: [
      'Analyzing organizational data to provide actionable insights for business decisions.',
      'Creating interactive Power BI dashboards and visual reports to monitor KPIs.',
      'Automating data collection and cleaning processes using Python and Excel.',
      'Collaborating with teams to identify trends and opportunities for growth.',
    ],
  },
  {
    title: 'Software Developer',
    company: 'Ghana Library Authority',
    duration: 'Jun 2022 – Dec 2023',
    expanded: false,
    responsibilities: [
      'Developed web-based systems using Angular and FastAPI to manage digital resources.',
      'Implemented authentication, data visualization, and backend integrations.',
      'Collaborated with cross-functional teams to digitize learning materials and improve user experience.',
      'Optimized system performance and maintained code documentation.',
    ],
  },
  {
    title: 'Digital Designer',
    company: 'Kr8tive Impakt',
    duration: 'Jan 2021 – May 2022',
    expanded: false,
    responsibilities: [
      'Created visual brand identities and digital designs for clients and campaigns.',
      'Designed UI/UX layouts for web and mobile applications.',
      'Worked closely with developers to bring creative concepts to life through code.',
      'Managed multiple client projects ensuring creative consistency and timely delivery.',
    ],
  },
];
 expandedExperiences = [false, false, false];

toggleExperience(index: number): void {
  this.expandedExperiences[index] = !this.expandedExperiences[index];
}
  
  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
      setTimeout(() => {
        document.querySelectorAll('.animate-on-load').forEach(el => {
          el.classList.add('animate-fadeInUp', 'animate-fadeIn', 'animate-fadeInLeft', 'animate-fadeInRight');
        });
      }, 100);
    }, 800);

    this.initIntersectionObserver();
    
    this.initSmoothScroll();

    this.onWindowScroll();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    this.scrollProgress = (scrollTop / scrollHeight) * 100;

    this.isScrolled = scrollTop > 50;

    this.showBackToTop = scrollTop > 500;

    this.updateSectionInView();
  }

  initIntersectionObserver(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.sectionInView = entry.target.id;
        }
      });
    }, options);

    setTimeout(() => {
      const sections = document.querySelectorAll('section');
      sections.forEach(section => observer.observe(section));
    }, 100);
  }

  initSmoothScroll(): void {
    if (!('scrollBehavior' in document.documentElement.style)) {
      this.loadSmoothScrollPolyfill();
    }
  }

  loadSmoothScrollPolyfill(): void {
    console.log('Loading smooth scroll polyfill...');
  }

  updateSectionInView(): void {
    const sections = ['profile', 'about', 'experience', 'projects', 'contact'];
    const scrollPosition = window.pageYOffset + window.innerHeight / 2;

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const { top, bottom } = element.getBoundingClientRect();
        const elementTop = top + window.pageYOffset;
        const elementBottom = bottom + window.pageYOffset;

        if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
          this.sectionInView = sectionId;
          break;
        }
      }
    }
  }

  navigateToSection(section: string): void {
    const element = document.getElementById(section);
    if (element) {
      if (this.isMenuOpen) {
        this.isMenuOpen = false;
      }

      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      this.smoothScrollTo(offsetPosition, 1000);
    }
  }

  smoothScrollTo(targetPosition: number, duration: number): void {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const easeInOutQuad = (t: number): number => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    const animation = (currentTime: number): void => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutQuad(progress);
      
      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }

  scrollToTop(): void {
    this.smoothScrollTo(0, 1000);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  sendMessage(event: Event): void {
    event.preventDefault();
    
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    console.log('Sending message:', { name, email, message });
    
    alert('Thank you for your message! I will get back to you soon.');
    
    form.reset();
  }

  scrollToAbout(): void {
    this.navigateToSection('about');
  }

  scrollToexperience(): void {
    this.navigateToSection('experience');
  }

  scrollToProjects(): void {
    this.navigateToSection('projects');
  }

  scrollToContact(): void {
    this.navigateToSection('contact');
  }
  downloadResume(): void {
    const link = document.createElement('a');
    link.href = 'assets/David_Oliver_Resume.pdf';
    link.download = 'David_Oliver_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  ngOnDestroy(): void {
    document.body.style.overflow = 'auto';
  }
}