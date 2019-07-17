class Point {
    private _point: THREE.BufferGeometry;

    public X: any;
    public Y: any;
    public Z: any;
    public SRID: number;

    constructor(x: number, y: number, z: number) {
        this._point = new THREE.BufferGeometry();
        var vertex = new Float32Array([x, y, z]);
        this._point.addAttribute('vertex', new THREE.BufferAttribute(vertex, 3));
        
        this.X = this._point.getAttribute('vertex').getX(0);
        this.Y = this._point.getAttribute('vertex').getY(0);
        this.Z = this._point.getAttribute('vertex').getZ(0);
    }   
}