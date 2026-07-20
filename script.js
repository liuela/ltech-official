// Scroll animation

const cards = document.querySelectorAll(".card");


const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";
entry.target.style.transform="translateY(0)";

}

});


});


cards.forEach(card=>{

card.style.opacity="0";
card.style.transform="translateY(50px)";
card.style.transition="0.8s";

observer.observe(card);

});



// Current year

console.log("L Tech Website Loaded Successfully");


// L Tech 3D Background

const canvas = document.getElementById("bg3d");


const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);


const renderer = new THREE.WebGLRenderer({
canvas:canvas,
alpha:true
});


renderer.setSize(
window.innerWidth,
window.innerHeight
);



const geometry = new THREE.BufferGeometry();


let particles = [];

for(let i=0;i<1500;i++){

particles.push(

(Math.random()-0.5)*20,
(Math.random()-0.5)*20,
(Math.random()-0.5)*20

);

}



geometry.setAttribute(
"position",
new THREE.Float32BufferAttribute(
particles,
3
)
);



const material = new THREE.PointsMaterial({

size:0.03

});


const stars = new THREE.Points(
geometry,
material
);


scene.add(stars);



camera.position.z=5;



function animate(){

requestAnimationFrame(animate);


stars.rotation.y +=0.0008;

stars.rotation.x +=0.0005;


renderer.render(
scene,
camera
);


}


animate();



// Responsive

window.addEventListener(
"resize",
()=>{

camera.aspect =
window.innerWidth/window.innerHeight;

camera.updateProjectionMatrix();


renderer.setSize(
window.innerWidth,
window.innerHeight
);


});