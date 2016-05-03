window.onload = function()
{
	var ancho = window.innerWidth;
	var alto = window.innerHeight;
	var lienzo = new THREE.WebGLRenderer({alpha: true});
	var planets= [{	nombre  : "mercurio",
									tamano 	: 3.4,
								 	imagen	: 'img/mercurio.jpg',
								 	x : -250,
								 	objeto:0
								},
								{	nombre  : "venus",
									tamano 	:8.4,
									imagen	: 'img/venus.jpg',
									x : -120,
									objeto:0
								},
								{	nombre  : "tierra",
								  tamano 	: 8.9,
									imagen	: 'img/tierra.jpg',
									x : 0,
									objeto:0
								},
								{	nombre  : "marte",
								  tamano 	: 4.7,
									imagen	: 'img/marte.jpg',
									x : 100,
									objeto:0
								}
							];
	lienzo.setSize(ancho, alto);
	document.body.appendChild(lienzo.domElement);
	var escena 		  = new THREE.Scene,
		tamanoJupiter = 300;
	var crearPlaneta = function(data)
	{
		var geometria = new THREE.SphereGeometry(data.tamano,data.tamano,data.tamano);
		var textura = THREE.ImageUtils.loadTexture(data.imagen);
		var material = new THREE.MeshBasicMaterial( { map: textura } );
		return new THREE.Mesh(geometria, material);
	};

	var jupiter = crearPlaneta({
									tamano 	: tamanoJupiter,
									imagen	: 'img/jupiter.jpg'
							  }),
		escalaJupiter = true;

	escena.add(jupiter);

	for (var i = 0; i < planets.length; i++) {
		planets[i].objeto =	crearPlaneta({
											tamano:tamanoJupiter*(planets[i].tamano/100),
											imagen:planets[i].imagen});
		planets[i].objeto.position.x=planets[i].x;
			escena.add(planets[i].objeto);
	}

	var camara = new THREE.PerspectiveCamera(50,(ancho / alto),0.1, 10000);
	camara.position.y = 160;
	camara.position.z = 400;
	camara.lookAt(jupiter.position);
	jupiter.position.x =500;
	escena.add(camara);

	//informacion de rotacion de los planetas : http://rinconsolidario.org/frecuencias/planetas.htm
	function renderizar()
	{
		jupiter.rotation.y += 1;
		for (var i = 0; i < planets.length; i++) {

			if(planets[i].nombre=="mercurio")
			{
					planets[i].objeto.rotation.y += 0.0045;
			}
			if(planets[i].nombre=="venus")
			{
					planets[i].objeto.rotation.y += -0.00164;
			}
			if(planets[i].nombre=="tierra")
			{
					planets[i].objeto.rotation.y += 0.4;
			}
			if(planets[i].nombre=="marte")
			{
					planets[i].objeto.rotation.y += 0.41203;
			}

		}

		lienzo.render(escena, camara);
		requestAnimationFrame(renderizar);
	}
	renderizar();
};
