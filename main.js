import Map from 'https://js.arcgis.com/5.0/@arcgis/core/Map.js';
import MapView from 'https://js.arcgis.com/5.0/@arcgis/core/views/MapView.js';
import BasemapGallery from 'https://js.arcgis.com/5.0/@arcgis/core/widgets/BasemapGallery.js';
import LayerList from 'https://js.arcgis.com/5.0/@arcgis/core/widgets/LayerList.js';
import Legend from 'https://js.arcgis.com/5.0/@arcgis/core/widgets/Legend.js';
import ScaleBar from 'https://js.arcgis.com/5.0/@arcgis/core/widgets/ScaleBar.js';
import Search from 'https://js.arcgis.com/5.0/@arcgis/core/widgets/Search.js';
import FeatureLayer from 'https://js.arcgis.com/5.0/@arcgis/core/layers/FeatureLayer.js';
import Graphic from 'https://js.arcgis.com/5.0/@arcgis/core/Graphic.js';

// ========== 1. 初始化地图 ==========
const map = new Map({
    basemap: "arcgis-topographic",
    ground: "world-elevation"
});

// ========== 2. 初始化视图（北京天安门为中心）==========
const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [116.397428, 39.90923],
    zoom: 12,
    padding: { top: 0, right: 0, bottom: 0, left: 0 }
});

// ========== 3. 添加专题图层：北京POI数据（图标放大版）==========
const beijingPOI = new FeatureLayer({
    title: "🏛️ 北京景点地标",
    source: [],
    fields: [
        { name: "Name", type: "string" },
        { name: "Type", type: "string" },
        { name: "Description", type: "string" }
    ],
    objectIdField: "ObjectID",
    geometryType: "point",
    renderer: {
        type: "simple",
        symbol: {
            type: "simple-marker",
            color: "#ff4444",        // 鲜艳红色
            size: "18px",            // 放大到18px
            outline: { color: "white", width: 2.5 }
        }
    },
    popupTemplate: {
        title: "{Name}",
        content: "<b>类型：</b>{Type}<br><b>简介：</b>{Description}"
    }
});

// 北京主要景点数据
const beijingLandmarks = [
    { name: "故宫博物院", type: "历史文化", desc: "明清两代皇家宫殿，世界文化遗产", lng: 116.397, lat: 39.918 },
    { name: "天安门广场", type: "城市地标", desc: "中国国家象征，世界最大城市广场", lng: 116.3978, lat: 39.9037 },
    { name: "颐和园", type: "皇家园林", desc: "中国古典园林典范，世界文化遗产", lng: 116.272, lat: 39.992 },
    { name: "天坛公园", type: "祭祀建筑", desc: "明清皇帝祭天场所，世界文化遗产", lng: 116.410, lat: 39.882 },
    { name: "鸟巢", type: "现代建筑", desc: "2008北京奥运会主体育场", lng: 116.397, lat: 39.993 },
    { name: "水立方", type: "现代建筑", desc: "2008北京奥运会游泳馆", lng: 116.398, lat: 39.991 },
    { name: "长城-八达岭", type: "历史遗迹", desc: "世界七大奇迹之一", lng: 116.013, lat: 40.362 },
    { name: "王府井大街", type: "商业街区", desc: "北京著名商业步行街", lng: 116.410, lat: 39.912 },
    { name: "南锣鼓巷", type: "胡同文化", desc: "老北京风情街", lng: 116.402, lat: 39.928 },
    { name: "什刹海", type: "自然景观", desc: "历史文化风景区", lng: 116.387, lat: 39.935 },
    { name: "北京大学", type: "高等学府", desc: "中国顶尖高等学府", lng: 116.309, lat: 39.991 },
    { name: "清华大学", type: "高等学府", desc: "中国顶尖高等学府", lng: 116.326, lat: 40.003 }
];

// 将数据添加到图层
const graphics = beijingLandmarks.map(item => {
    return new Graphic({
        geometry: { type: "point", longitude: item.lng, latitude: item.lat },
        attributes: { Name: item.name, Type: item.type, Description: item.desc }
    });
});
beijingPOI.source = graphics;
map.add(beijingPOI);

// ========== 4. 添加第二个图层：北京地铁线路示意（图标放大版）==========
const subwayStations = new FeatureLayer({
    title: "🚇 北京地铁站点",
    source: [],
    fields: [
        { name: "StationName", type: "string" },
        { name: "Line", type: "string" }
    ],
    objectIdField: "ObjectID",
    geometryType: "point",
    renderer: {
        type: "simple",
        symbol: {
            type: "simple-marker",
            color: "#00bcd4",        // 亮青色
            size: "14px",            // 放大到14px
            outline: { color: "white", width: 2 }
        }
    },
    popupTemplate: {
        title: "{StationName}",
        content: "地铁线路：{Line}"
    }
});

// 主要地铁站点数据
const stations = [
    { name: "天安门东", line: "1号线", lng: 116.401, lat: 39.907 },
    { name: "天安门西", line: "1号线", lng: 116.393, lat: 39.907 },
    { name: "王府井", line: "1号线", lng: 116.410, lat: 39.909 },
    { name: "西单", line: "1号线/4号线", lng: 116.375, lat: 39.910 },
    { name: "东单", line: "1号线/5号线", lng: 116.421, lat: 39.909 },
    { name: "前门", line: "2号线", lng: 116.398, lat: 39.899 },
    { name: "鼓楼大街", line: "2号线/8号线", lng: 116.394, lat: 39.945 },
    { name: "奥林匹克公园", line: "8号线/15号线", lng: 116.397, lat: 40.001 },
    { name: "北京大学东门", line: "4号线", lng: 116.316, lat: 39.986 },
    { name: "圆明园", line: "4号线", lng: 116.306, lat: 40.008 }
];

const stationGraphics = stations.map(item => {
    return new Graphic({
        geometry: { type: "point", longitude: item.lng, latitude: item.lat },
        attributes: { StationName: item.name, Line: item.line }
    });
});
subwayStations.source = stationGraphics;
map.add(subwayStations);

// ========== 5. 添加微件 ==========
view.when(() => {
    console.log("✅ 地图加载完成");
    
    // 5.1 比例尺
    const scaleBar = new ScaleBar({
        view: view,
        unit: "metric",
        style: "ruler"
    });
    view.ui.add(scaleBar, "bottom-left");
    
    // 5.2 图例
    const legend = new Legend({
        view: view,
        style: "card"
    });
    view.ui.add(legend, "bottom-left");
    legend.container.style.marginBottom = "40px";
    
    // 5.3 搜索框
    const searchWidget = new Search({
        view: view,
        includeDefaultSources: true,
        locationEnabled: true,
        maxResults: 8,
        popupEnabled: true
    });
    view.ui.add(searchWidget, "top-right");
    
    // 5.4 图层列表
    const layerList = new LayerList({
        view: view,
        container: "layerListDiv",
        listItemCreatedFunction: (event) => {
            const item = event.item;
            item.panel = {
                content: "legend",
                open: true
            };
        }
    });
    
    // 5.5 底图库
    const basemapGallery = new BasemapGallery({
        view: view,
        container: "basemapGalleryDiv"
    });
    
    // 5.6 欢迎弹窗
    view.popup.open({
        title: "🏙️ 欢迎来到智慧北京平台",
        content: `
            <div style="padding: 8px; line-height: 1.6;">
                <p>📊 当前数据：</p>
                <ul style="margin-left: 20px;">
                    <li>🏛️ 北京主要景点地标：${beijingLandmarks.length}处</li>
                    <li>🚇 北京地铁站点：${stations.length}个</li>
                </ul>
                <p>💡 提示：右侧可切换底图样式 | 右上角可控制图层显隐</p>
            </div>
        `,
        location: view.center
    });
    
    setTimeout(() => { view.popup.close(); }, 6000);
});

// 加载失败处理
view.catch(error => {
    console.error("地图加载失败:", error);
    document.getElementById("viewDiv").innerHTML = `
        <div style="display:flex;align-items:center;justify-content:center;height:100%;flex-direction:column;background:#f5f5f5;">
            <h3>⚠️ 地图加载失败</h3>
            <p>请检查网络连接后刷新页面</p>
            <p style="color:#999;font-size:12px;">${error.message}</p>
        </div>
    `;
});