// Create a function to generate the HTML content
function createWebsiteContent() {
    // Create the header section
    const header = document.createElement('section');
    header.id = 'header';

    const logoLink = document.createElement('a');
    logoLink.href = '#';
    const logoImg = document.createElement('img');
    logoImg.src = 'images/logo.jpg';
    logoImg.className = 'logo';
    logoImg.alt = '';
    logoLink.appendChild(logoImg);
    header.appendChild(logoLink);

    const navDiv = document.createElement('div');
    const navbar = document.createElement('ul');
    navbar.id = 'navbar';

    const links = [
        { href: 'index.html', text: 'Home' },
        { href: 'page.js', text: 'Login' },
        { href: '', text: 'Shop' },
        { href: '', text: 'Blog' },
        { href: '', text: 'About' },
        { href: '', text: 'Contact' },
    ];

    links.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.text;
        li.appendChild(a);
        navbar.appendChild(li);
    });

    const cartLi = document.createElement('li');
    const cartA = document.createElement('a');
    const cartIcon = document.createElement('i');
    cartIcon.className = 'fa fa-shopping-cart';
    cartIcon.style.fontSize = '36px';
    cartA.appendChild(cartIcon);
    cartLi.appendChild(cartA);
    navbar.appendChild(cartLi);

    navDiv.appendChild(navbar);
    header.appendChild(navDiv);
    document.body.appendChild(header);

    // Create the hero section
    const hero = document.createElement('section');
    hero.id = 'hero';
    hero.innerHTML = `
        <h4>Trade-in-offer</h4>
        <h2>Super value deals</h2>
        <h1>On all products</h1>
        <p>Save more with coupons and up to 20% off!</p>
        <button>Shop Now</button>
    `;
    document.body.appendChild(hero);

    // Create the feature section
    const feature = document.createElement('section');
    feature.id = 'feature';
    const featureBox = document.createElement('div');
    featureBox.className = 'fe-box';
    feature.appendChild(featureBox);
    document.body.appendChild(feature);
}

// Add stylesheets
const link1 = document.createElement('link');
link1.rel = 'stylesheet';
link1.href = 'styles.css';
document.head.appendChild(link1);

const link2 = document.createElement('link');
link2.rel = 'stylesheet';
link2.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
document.head.appendChild(link2);

// Call the function to create the website content
createWebsiteContent();

// Include your external script
const script = document.createElement('script');
script.src = 'script.js';
document.body.appendChild(script);
