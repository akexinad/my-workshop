var renderer, scene, camera, controls ;

init();

function init() {
    
    /*SETTINGS*/
    
    const renderer = new THREE.WebGLRenderer({alpha:true});
    renderer.setClearColor(0xaaaaaa);
    renderer.setSize(innerWidth,innerHeight);
    document.body.appendChild(renderer.domElement);
    
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(70,innerWidth/innerHeight,1,40);
    camera.position.set(2,2,6);
    
    const controls = new THREE.TrackballControls(camera,renderer.domElement);
    controls.rotateSpeed = 5;
    
    
    /*OBJECTS*/
    
    createGrid(); 
    var light = new THREE.SpotLight(0xffffff,10,20);
    light.position.set(-10,10,10);
    scene.add(light);
    
    
    //1.Create a mesh
    const object = new THREE.Mesh(
        new THREE.BoxGeometry(2,2,2),
        new THREE.MeshLambertMaterial({color:0x00aa00,transparent:true})
        );
    
    //2.create vertexHelpers
    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(.1,.1,.1,8,8),
        new THREE.MeshBasicMaterial({color:0x000000})
        );
    const vertexHelpers = [];
    for (let i=0; i < object.geometry.vertices.length; i++) {
        const vertexHelper = sphere.clone();
        const vertexPosition = object.geometry.vertices[i];
        vertexHelper.position.copy(vertexPosition);
        vertexHelper.visible = false;
        vertexHelper.data = {index:i};
        scene.add(vertexHelper);
        vertexHelpers.push(vertexHelper);
    }
    
    //3. create an (invisible) plane to drag the vertices on
    const plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(8,8,8,1,1,1),
        new THREE.MeshBasicMaterial({color:0x000000,transparent:true,opacity:.1,depthWrite:false,side:THREE.DoubleSide})
        );
    //plane.visible=false;
    
    scene.add(object,plane);
    
    
    /*GEOMETRY EDITION*/
    
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let INTERSECTED, SELECTED;
    
    //custom features
    let mouseDown = false;
    let mode = 'resize mode';
    
    //listeners
    renderer.domElement.addEventListener('mousemove',onDocumentMouseMove,false);
    renderer.domElement.addEventListener('mousedown',onDocumentMouseDown,false);
    renderer.domElement.addEventListener('mouseup',onDocumentMouseUp,false);
    
    function onDocumentMouseMove(e) {
        e.preventDefault();
        mouse.x = (e.clientX/innerWidth) * 2 - 1;
        mouse.y = -(e.clientY/innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse,camera);
        
        //1. MOVE SELECTED OBJECTS
        if (SELECTED) {
            plane.position.copy(SELECTED.position);
            plane.lookAt(camera.position);
            let intersects = raycaster.intersectObject(plane);
            if (mode === 'resize mode') {
                
                var increaseRatio = intersects[0].point.sub(object.position).length() / SELECTED.position.sub(object.position).length();
                object.scale.set(
                    object.scale.x * increaseRatio,
                    object.scale.y * increaseRatio,
                    object.scale.z * increaseRatio
                );
                //also update other vertexHelpers'position
                for (let i = 0; i < vertexHelpers.length; i++) {
                    const vector = new THREE.Vector3().copy(vertexHelpers[i].position.sub(object.position));
                    vector.multiplyScalar(increaseRatio);
                    vertexHelpers[i].position.copy(vector);
                }
            }
            if (mode === 'edit mode') {
                SELECTED.position.copy(intersects[0].point);
                object.worldToLocal(intersects[0].point);//if the cube has been scaled the vertices coordinates don't match the world coordinates. This line converts the vector to local coordinates.
                object.geometry.vertices[SELECTED.data.index].copy(intersects[0].point);
                object.geometry.verticesNeedUpdate=true;
            }
            return;
            //'return' because we don't want the 'picking objects' part 
            //if we were yet dragging something
        }
        
        //2. PICK OBJECTS
        var intersects = raycaster.intersectObjects(scene.children);
        var metObject = false, metVertex = undefined;
        
        for (var i=0; i < intersects.length; i++) {
            var result = intersects[i].object;
            if(result==object)metObject=true;
            if(result.geometry instanceof THREE.SphereGeometry && !metVertex)metVertex=result;
        }
        if(metVertex){
            if(INTERSECTED!=metVertex)INTERSECTED=metVertex;
            document.body.style.cursor='move';
        }else{
            INTERSECTED=null;
            document.body.style.cursor='auto';
        }
        
        //little appearance changes
        if((metVertex||metObject)&&!mouseDown){
            object.material.opacity=.5;
            for(var i=0;i<vertexHelpers.length;i++){
                vertexHelpers[i].visible=true;
            }
        }else{
            object.material.opacity=1;
            for(var i=0;i<vertexHelpers.length;i++){
                vertexHelpers[i].visible=false;
            }
        }
    }
    function onDocumentMouseDown(e){
        e.preventDefault();
        if(INTERSECTED){ 
            controls.enabled=false;
            SELECTED=INTERSECTED;
        }
        mouseDown=true;
    }
    function onDocumentMouseUp(e){
        e.preventDefault();
        controls.enabled=true;
        SELECTED=null;
        document.body.style.cursor='auto';
        mouseDown=false;
    }
    
    /*UI*/
    var modeButton=document.createElement('button');
    modeButton.innerHTML=mode;
    modeButton.style.cssText='position:absolute;top:10px;';
    modeButton.addEventListener('click',function(){
        mode=mode==='resize mode'?'edit mode':'resize mode';
        modeButton.innerHTML=mode;
    },false);
    document.body.appendChild(modeButton);
    
    var planeButton=document.createElement('button');
    var view='plane visible';
    planeButton.innerHTML=view;
    planeButton.style.cssText='position:absolute;top:40px;';
    planeButton.addEventListener('click',function(){
        if(view==='plane visible'){
            view='plane hidden';
            plane.visible=false;
        }else{
            view='plane visible';
            plane.visible=true;
        }
        planeButton.innerHTML=view;
    },false);
    document.body.appendChild(planeButton);
    
    animate();
    
}

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
    controls.update();
}

function createGrid(){
    for(var i=0;i<11;i++){
        var material=new THREE.LineBasicMaterial({color:0xbbbbbb});
        if(i===5)material.color.setHex(0x666666);
        var geo=new THREE.Geometry();
        var x=i*.6-3;
        geo.vertices.push(
            new THREE.Vector3(0,0,-3),
            new THREE.Vector3(0,0,3)
        );
        var line=new THREE.Line(
            geo,
            material
        );
        line.position.x=x;
        scene.add(line);
    }
    for(var i=0;i<11;i++){
        var material=new THREE.LineBasicMaterial({color:0xbbbbbb});
        if(i===5)material.color.setHex(0x666666);
        var geo=new THREE.Geometry();
        var x=i*.6-3;
        geo.vertices.push(
            new THREE.Vector3(-3,0,0),
            new THREE.Vector3(3,0,0)
        );
        var line=new THREE.Line(
            geo,
            material
        );
        line.position.z=x;
        scene.add(line);
    }
}