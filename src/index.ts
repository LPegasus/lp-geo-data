import './index.less';
import EmitterLite from './EmitterLite';
import * as d3 from 'd3';
import { GeoJSON } from './GeoJSON';

class LPGeoMap extends EmitterLite {
  public id: string;
  private root: HTMLElement;
  private svg: SVGSVGElement;
  private geoData: GeoJSON;
  private extraData: Object;
  constructor(params: LPGeoMapCtorParam) {
    super();
    this.root = params.el;
    this.id = params.id;
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.root.appendChild(this.svg);
  }

  setData(data: GeoJSON) {
    this.geoData = data;
    return this.render();
  }

  setExtraData(extraData: Object) {
    this.extraData = Object.assign({}, extraData);
    return this;
  }

  // 绘制地图
  render = () => {
    d3.select(this.svg).selectAll('path').data(this.geoData).enter().append('path').attr('d');
  }
}

interface LPGeoMapCtorParam {
  el: HTMLElement;
  id: string;
}

export default LPGeoMap;
