import React, { FC, useEffect } from "react";
import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Color3, Color4 } from "@babylonjs/core/Maths/math.color";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";

import "./BarChart.scss";
import { AdvancedDynamicTexture } from "@babylonjs/gui/2D/advancedDynamicTexture";
import { TextBlock } from "@babylonjs/gui/2D/controls/textBlock";
import { formatNumber } from "./helpers/format-number";

export interface BarChartProps {
  xLabels: string[];
  yLabels: string[];
  data: number[][];
}

const BarChart: FC<BarChartProps> = ({ xLabels, yLabels, data }) => {
  const deg = (degrees: number): number => {
    return (degrees / 180) * Math.PI;
  };

  useEffect(() => {
    const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
    const engine = new Engine(canvas);
    const scene = new Scene(engine);
    scene.clearColor = new Color4(0, 0, 0, 0.0000000000000001);

    // Parameters: name, alpha, beta, radius, target position, scene
    const camera = new ArcRotateCamera(
      "Camera",
      deg(60),
      deg(30),
      12,
      new Vector3(xLabels.length, 0, yLabels.length),
      scene
    );
    camera.lowerAlphaLimit = deg(0);
    camera.upperAlphaLimit = deg(90);
    camera.lowerBetaLimit = deg(15);
    camera.upperBetaLimit = deg(90 - 15);
    camera.lowerRadiusLimit = 6;
    camera.upperRadiusLimit = 50;

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    const ground = MeshBuilder.CreateGround(
      "ground1",
      {
        width: xLabels.length * 2,
        height: yLabels.length * 2,
        subdivisions: 1,
      },
      scene
    );
    ground.position = new Vector3(xLabels.length, 0, yLabels.length);
    const groundMaterial = new StandardMaterial("ground", scene);
    groundMaterial.diffuseColor = new Color3(0.5, 0.5, 0.5);
    groundMaterial.alpha = 0.4;
    ground.material = groundMaterial;

    // Bars
    const boxMaterial = new StandardMaterial("green", scene);
    boxMaterial.diffuseColor = new Color3(229 / 255, 114 / 255, 8 / 255);
    const max = Math.max(...data.flat());
    const heightScale = max ? 4 / max : 1;
    data.forEach((row: number[], rowIndex: number) => {
      row.forEach((cel: number, celIndex: number) => {
        // Bar
        const barHeight = Math.max(cel * heightScale, 0.01);
        const rowPosition = rowIndex * 2 + 1;
        const columnPosition = celIndex * 2 + 1;
        const heightPosition = (cel / 2) * heightScale;

        const box = MeshBuilder.CreateBox(
          "box",
          { width: 1, depth: 1, height: barHeight },
          scene
        );
        box.position = new Vector3(rowPosition, heightPosition, columnPosition);
        box.material = boxMaterial;

        // Label
        const labelPlane = MeshBuilder.CreatePlane("countLabelPlane", {
          width: 2,
          height: 2,
        });
        labelPlane.parent = ground;
        labelPlane.position = new Vector3(
          rowIndex * 2 - xLabels.length + 1,
          cel * heightScale + 0.001,
          celIndex * 2 - yLabels.length + 1
        );
        labelPlane.rotation = new Vector3(deg(90), deg(180 + 45), deg(0));
        const advancedTexture =
          AdvancedDynamicTexture.CreateForMesh(labelPlane);
        const label = new TextBlock();
        label.text = formatNumber(cel, 3);
        label.color = "white";
        label.fontSize = 200;
        advancedTexture.addControl(label);
      });
    });

    // Labels

    // xLabels
    xLabels.forEach((labelX, labelXIndex) => {
      const LABEL_SIZE = 10;
      const labelPlane = MeshBuilder.CreatePlane("plane", {
        width: LABEL_SIZE,
        height: 2,
      });
      labelPlane.parent = ground;
      labelPlane.position = new Vector3(
        labelXIndex * 2 - xLabels.length + 1,
        0,
        data[0].length + LABEL_SIZE / 2 + 0.5
      );
      labelPlane.rotation = new Vector3(deg(90), deg(-90), deg(0));
      const advancedTexture = AdvancedDynamicTexture.CreateForMesh(labelPlane);
      const label = new TextBlock();
      label.text = labelX;
      label.textHorizontalAlignment = TextBlock.HORIZONTAL_ALIGNMENT_LEFT;
      label.color = "black";
      label.fontSize = 50;
      advancedTexture.vScale = (1 / LABEL_SIZE) * 2;
      advancedTexture.vOffset = (1 / LABEL_SIZE) * 4;
      advancedTexture.addControl(label);
    });

    // yLabels
    yLabels.forEach((labelY, labelYIndex) => {
      const LABEL_SIZE = 10;
      const labelPlane = MeshBuilder.CreatePlane("plane", {
        width: LABEL_SIZE,
        height: 2,
      });
      labelPlane.parent = ground;
      labelPlane.position = new Vector3(
        data.length + LABEL_SIZE / 2 + 0.5,
        0,
        labelYIndex * 2 - data[0].length + 1
      );
      labelPlane.rotation = new Vector3(deg(90), deg(180), deg(0));
      const advancedTexture = AdvancedDynamicTexture.CreateForMesh(labelPlane);
      const label = new TextBlock();
      label.text = labelY;
      label.textHorizontalAlignment = TextBlock.HORIZONTAL_ALIGNMENT_RIGHT;
      label.color = "black";
      label.fontSize = 50;
      advancedTexture.vScale = (1 / LABEL_SIZE) * 2;
      advancedTexture.vOffset = (1 / LABEL_SIZE) * 4;
      advancedTexture.addControl(label);
    });

    engine.runRenderLoop(() => {
      scene.render();
    });

    return () => {
      scene.dispose();
      engine.dispose();
    };
  }, []);

  return <canvas id="renderCanvas"></canvas>;
};

export default BarChart;
