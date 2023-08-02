const container = document.getElementById('container');

const colorGradiant = [
  '#0020ff',
  '#0220fd',
  '#0420fb',
  '#0620f9',
  '#0920f7',
  '#0b20f6',
  '#0d20f4',
  '#1020f2',
  '#1220f0',
  '#1420ee',
  '#1620ed',
  '#1920eb',
  '#1b20e9',
  '#1d20e7',
  '#2020e5',
  '#2220e4',
  '#2420e2',
  '#2620e0',
  '#2920de',
  '#2b20dc',
  '#2d21db',
  '#3021d9',
  '#3221d7',
  '#3421d5',
  '#3721d3',
  '#3921d2',
  '#3b21d0',
  '#3d21ce',
  '#4021cc',
  '#4221ca',
  '#4421c9',
  '#4721c7',
  '#4921c5',
  '#4b21c3',
  '#4d21c1',
  '#5021c0',
  '#5221be',
  '#5421bc',
  '#5721ba',
  '#5921b8',
  '#5b22b7',
  '#5e22b5',
  '#6022b3',
  '#6222b1',
  '#6422af',
  '#6722ae',
  '#6922ac',
  '#6b22aa',
  '#6e22a8',
  '#7022a6',
  '#7222a5',
  '#7422a3',
  '#7722a1',
  '#79229f',
  '#7b229d',
  '#7e229c',
  '#80229a',
  '#822298',
  '#842296',
  '#872294',
  '#892393',
  '#8b2391',
  '#8e238f',
  '#90238d',
  '#92238b',
  '#95238a',
  '#972388',
  '#992386',
  '#9b2384',
  '#9e2382',
  '#a02381',
  '#a2237f',
  '#a5237d',
  '#a7237b',
  '#a92379',
  '#ab2378',
  '#ae2376',
  '#b02374',
  '#b22372',
  '#b52370',
  '#b7246f',
  '#b9246d',
  '#bc246b',
  '#be2469',
  '#c02467',
  '#c22466',
  '#c52464',
  '#c72462',
  '#c92460',
  '#cc245e',
  '#ce245d',
  '#d0245b',
  '#d22459',
  '#d52457',
  '#d72455',
  '#d92454',
  '#dc2452',
  '#de2450',
  '#e0244e',
  '#e3254d',
];

const parseLogData = (logData) => {
  const logLines = logData.split('\n');
  const logDataObjs = logLines
    .filter((el) => !!el)
    .map((logEntry) => {
      const msg = logEntry.split(' - ')[1];

      const timestamp = logEntry.substring(
        logEntry.indexOf('[') + 1,
        logEntry.indexOf(']')
      );

      return { ...JSON.parse(msg), timestamp };
    });

  return logDataObjs;
};

const generatedBaseGraphData = (data) => {
  let prevAction;
  let prevExecutionId;

  const rawData = data.reduce(
    (acc, entry) => {
      const localAcc = acc;

      const { executionId, action, timestamp } = entry;

      if (!executionId || !action || !timestamp) return localAcc;

      localAcc.nodes.push(action);

      if (prevExecutionId === executionId && prevAction)
        localAcc.edges.push({ source: prevAction, target: action });

      prevAction = action;
      prevExecutionId = executionId;

      return localAcc;
    },
    { nodes: [], edges: [] }
  );

  const nodes = [];
  rawData.nodes.forEach((action) => {
    const nodeIndex = nodes.findIndex((node) => node.id === action);
    if (nodeIndex === -1)
      nodes.push({ id: action, label: action, numExecutions: 1 });
    else nodes[nodeIndex].numExecutions += 1;
  });

  const edges = [];
  rawData.edges.forEach((rawEdge) => {
    const edgeIndex = edges.findIndex(
      (edge) => rawEdge.source === edge.source && rawEdge.target === edge.target
    );

    if (edgeIndex === -1)
      edges.push({
        source: rawEdge.source,
        target: rawEdge.target,
        numExecutions: 1,
      });
    else edges[edgeIndex].numExecutions += 1;
  });

  return {
    nodes,
    edges,
  };
};

const formatEdges = (edges) => {
  const baseLineWidth = 3;

  const baseEdge = {
    type: 'cubic-horizontal',
    style: {
      endArrow: true,
      radius: 20,
    },
    labelCfg: {
      style: {
        fill: '#828282',
        fontSize: 18,
      },
    },
  };

  const maxMinEdgeExecutionValues = edges.reduce(
    (acc, edge) => {
      const localAcc = acc;
      if (!localAcc.max || edge.numExecutions > localAcc.max)
        localAcc.max = edge.numExecutions;
      if (!localAcc.min || edge.numExecutions < localAcc.min)
        localAcc.min = edge.numExecutions;

      return localAcc;
    },
    { max: undefined, min: undefined }
  );

  return edges.map((edge) => {
    const interval =
      maxMinEdgeExecutionValues.max - maxMinEdgeExecutionValues.min;
    const valInterval = edge.numExecutions - maxMinEdgeExecutionValues.min;

    const colorIndex = Math.floor((valInterval / interval) * 100);
    const edgeLineWidthIndex = valInterval / interval;

    const color =
      colorGradiant[
        colorIndex === colorGradiant.length ? colorIndex - 1 : colorIndex
      ];
    return {
      ...baseEdge,
      ...edge,
      color,
      style: {
        ...baseEdge.style,
        lineWidth: baseLineWidth + Math.floor(edgeLineWidthIndex * 4),
      },
      label: `(${edge.numExecutions})`,
    };
  });
};

const formatNodes = (nodes) => {
  const colorWhite = '#ffffff';

  const baseNode = {
    type: 'rect',

    style: {
      width: 350,
      lineWidth: 2,
      stroke: colorWhite,
      radius: 5,
    },
    labelCfg: {
      style: {
        fill: colorWhite,
        fontSize: 18,
      },
    },
  };

  const maxMinNodeExecutionValues = nodes.reduce(
    (acc, node) => {
      const localAcc = acc;
      if (!localAcc.max || node.numExecutions > localAcc.max)
        localAcc.max = node.numExecutions;
      if (!localAcc.min || node.numExecutions < localAcc.min)
        localAcc.min = node.numExecutions;

      return localAcc;
    },
    { max: undefined, min: undefined }
  );

  return nodes.map((node) => {
    const interval =
      maxMinNodeExecutionValues.max - maxMinNodeExecutionValues.min;
    const valInterval = node.numExecutions - maxMinNodeExecutionValues.min;

    const colorIndex = Math.floor((valInterval / interval) * 100);

    return {
      ...baseNode,
      ...node,
      label: `${node.label} (${node.numExecutions})`,
      style: {
        ...baseNode.style,
        fill: colorGradiant[
          colorIndex === colorGradiant.length ? colorIndex - 1 : colorIndex
        ],
      },
    };
  });
};

const formatGraphData = (nodes, edges) => {
  const formattedNodes = formatNodes(nodes);

  const formattedEdges = formatEdges(edges);

  return { nodes: formattedNodes, edges: formattedEdges };
};

const buildOptions = (container) => {
  const colorLemonPurple = '#9803fc';

  const width = window.innerWidth;
  const height = window.innerHeight;

  // eslint-disable-next-line no-undef
  const grid = new G6.Grid();

  return {
    container,
    width,
    height,
    groupByTypes: false,
    modes: {
      default: ['drag-canvas', 'zoom-canvas', 'click-select'],
    },
    layout: {
      type: 'dagre',
      rankdir: 'LR',
      align: 'DL',
      sortByCombo: true,
      controlPoints: true,
      nodesep: 1,
      ranksep: 150,
    },
    nodeStateStyles: {
      selected: {
        stroke: colorLemonPurple,
        lineWidth: 3,
        shadowBlur: 10,
      },
    },
    edgeStateStyles: {
      nodeSelected: {
        stroke: colorLemonPurple,
        shadowColor: colorLemonPurple,
        shadowBlur: 2,
      },
    },
    plugins: [grid],
  };
};

const buildGraph = (graphData) => {
  const options = buildOptions(container);
  // eslint-disable-next-line no-undef
  const graph = new G6.Graph(options);

  graph.data({
    nodes: graphData.nodes,
    edges: graphData.edges.map(function (edge, i) {
      edge.id = 'edge' + i;
      return Object.assign({}, edge);
    }),
  });
  graph.render();

  if (typeof window !== 'undefined')
    window.onresize = () => {
      if (!graph || graph.get('destroyed')) return;
      if (!container || !container.scrollWidth || !container.scrollHeight)
        return;
      graph.changeSize(container.scrollWidth, container.scrollHeight);
    };
};

document.getElementById('inputfile').addEventListener('change', function () {
  const fr = new FileReader();
  fr.onload = function () {
    const logEntries = parseLogData(fr.result);
    const baseGraphData = generatedBaseGraphData(logEntries);
    const graphData = formatGraphData(baseGraphData.nodes, baseGraphData.edges);
    buildGraph(graphData);
  };

  fr.readAsText(this.files[0]);
});
