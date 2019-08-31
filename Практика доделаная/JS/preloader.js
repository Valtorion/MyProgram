function fadeOut(el) 
        {
  
        var opacit = 1;

            var timer = setInterval(function()
            {
                if(opacit <= 0.1) 
                {
            
                el.style.display = "none";
                clearInterval(timer);

                }

                el.style.opacity = opacit;
            

                opacit -= opacit * 0.1;
              
            }, 10);       

        }

        function PreLoader()
        {

            
                var preloader = document.getElementById('p_prldr'),
                    svg_anm   = document.getElementById('svg_anm');

                    preloader.style.opacity = 1;
                    svg_anm.style.opacity = 1;
                    preloader.style.display = "inline-block";
                    svg_anm.style.display = "inline-block";

                setTimeout(function(){fadeOut(svg_anm);}, 1000);
                setTimeout(function(){fadeOut(preloader);}, 1000);
            
        
        }
