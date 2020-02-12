function executeCode()
{
let canvas = document.querySelector("#canvas");
var ctx = canvas.getContext('2d');
let cotes = dimensionsCanvas();
//let distances = mesureDistances();

        function dimensionsCanvas()
            {
                let longueur = document.querySelector("#in_longueur").value/2;
                let largeur = document.querySelector("#in_largeur").value/2;

                let longueurCaisse = document.querySelector("#longueur_caisse").value/2;
                let largeurCaisse = document.querySelector("#largeur_caisse").value/2; // /2 pour cm

                let posXCaisse = document.querySelector("#in_posX_caisse").value/2;
                let posYCaisse = document.querySelector("#in_posY_caisse").value/2;
                
                let centreX = posXCaisse + (longueurCaisse/2);
                let centreY = posYCaisse + (largeurCaisse/2);

                let pointGX = centreX + (longueurCaisse/2);
                let pointGY = centreY;

                return {canvas: {longueur: longueur, largeur: largeur},
                        caisse: {longueur: longueurCaisse, largeur: largeurCaisse},
                        posCaisse: {x: posXCaisse, y: posYCaisse},
                        centre: {x: centreX, y: centreY},
                        pointG: {x: pointGX, y: pointGY}
                        };
            }; //renvoi les cotes

        function drawCanvas()
            {
                canvas.setAttribute("width", cotes.canvas.longueur);
                canvas.setAttribute("height", cotes.canvas.largeur);

                if (canvas.getContext) 
                            {
                                

                                ctx.strokeRect(cotes.posCaisse.x, cotes.posCaisse.y, cotes.caisse.longueur, cotes.caisse.largeur);

                                ctx.beginPath();
                                ctx.moveTo(cotes.centre.x, cotes.centre.y);
                                ctx.lineTo(cotes.pointG.x, cotes.centre.y + (cotes.caisse.largeur/2));
                                ctx.lineTo(cotes.pointG.x, cotes.centre.y - (cotes.caisse.largeur/2));
                                ctx.fill();
                            };
            };

            function afficheDistances()
            {
                if (canvas.getContext) 
                            {
                                var ctx = canvas.getContext('2d');
                                
                                ctx.beginPath();
                                ctx.moveTo(cotes.pointG.x, cotes.pointG.y);
                                ctx.lineTo(cotes.canvas.longueur, cotes.pointG.y);
                                ctx.moveTo(cotes.pointG.x, 0);
                                ctx.lineTo(cotes.pointG.x, cotes.canvas.largeur);
                                ctx.stroke();
                            };
            };

//je veux calculer la distaznce 
            //isPointInPath()Renvoie la valeur true si le point est situé dans le tracé en cours.
	
//je vais creer des points de verification sur le bord du canvas
    function checkPoints()
    {   //cree un tableau avec : [0]point gauche, [1]point droit, [2]point face,[3]g, [4]d, [5]f etc   = [i * 3]g
        let tablePointsVerifs = [{x: cotes.pointG.x, y: 0} ];

        let inSteps = document.querySelector("#in_steps").value;
                for (i = 0; i <= 100; i += parseInt(inSteps))
                    {
                        let steps = i * (cotes.canvas.longueur - cotes.pointG.x) /100;
                    //left
                        let point = {x: cotes.pointG.x + steps,
                                    y: 0,
                                    dir: "gauche"};
                        let newPoint = tablePointsVerifs.push(point);

                        console.log("nouv. point " + point.dir + ": " + point.x + ", " + point.y);

                        if (canvas.getContext)
                            {
                                ctx.moveTo(point.x, point.y);
                                ctx.lineTo(point.x, point.y + 2);
                                ctx.stroke();
                            };
                    //right
                        point = {x: cotes.pointG.x + steps,
                                 y: cotes.canvas.largeur,
                                 dir: "droite"};
                        newPoint = tablePointsVerifs.push(point); 
                        
                        console.log("nouv. point " + point.dir + ": " + point.x + ", " + point.y);

                        if (canvas.getContext)
                            {
                                ctx.moveTo(point.x, point.y);
                                ctx.lineTo(point.x, point.y - 2);
                                ctx.stroke();
                            };
                    //face
                        point = {x: cotes.canvas.longueur, 
                                 y: 0 + steps,
                                 dir: "face"};
                        newPoint = tablePointsVerifs.push(point);

                        console.log("nouv. point " + point.dir + ": " + point.x + ", " + point.y);

                        if (canvas.getContext)
                            {
                                ctx.moveTo(point.x, point.y);
                                ctx.lineTo(point.x - 2, point.y);
                                ctx.stroke();
                            };
                    }; //end boucle for           
                    
    };//end funct checkPoint()

dimensionsCanvas();
drawCanvas();
afficheDistances();
checkPoints();
}; //end code
