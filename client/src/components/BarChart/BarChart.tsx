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
      new Vector3(0, 0, 0),
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

    const boxMaterial = new StandardMaterial("green", scene);
    boxMaterial.diffuseColor = new Color3(44 / 255, 122 / 255, 123 / 255);
    boxMaterial.alpha = 0.95;

    // Bars
    const max = Math.max(...data.flat());
    const heightScale = max ? 4 / max : 1;
    data.forEach((row: number[], rowIndex: number) => {
      row.forEach((cel: number, celIndex: number) => {
        const barHeight = Math.max(cel * heightScale, 0.01);
        const rowPosition = rowIndex * 2 - data.length / 2;
        const columnPosition = celIndex * 2 - row.length / 2;
        const heightPosition = (cel / 2) * heightScale;

        const box = MeshBuilder.CreateBox(
          "box",
          { width: 1, depth: 1, height: barHeight },
          scene
        );
        box.position = new Vector3(rowPosition, heightPosition, columnPosition);
        box.material = boxMaterial;
      });
    });

    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
    const ground = MeshBuilder.CreateGround(
      "ground1",
      { width: 6, height: 6, subdivisions: 2 },
      scene
    );
    const groundMaterial = new StandardMaterial("ground", scene);
    groundMaterial.diffuseColor = new Color3(0.5, 0.5, 0.5);
    groundMaterial.alpha = 0.05;
    ground.material = groundMaterial;

    // Labels

    // xLabels
    xLabels.forEach((labelY, labelYIndex) => {
      const labelPlane = MeshBuilder.CreatePlane("plane", {
        width: 10,
        height: 10,
      });
      labelPlane.parent = ground;
      labelPlane.position = new Vector3(
        -data[0].length / 2 + labelYIndex * 2,
        0.2,
        data.length + 1 + 4
      );
      labelPlane.rotation = new Vector3(deg(90), deg(-90), deg(0));
      const advancedTexture = AdvancedDynamicTexture.CreateForMesh(labelPlane);
      const label = new TextBlock();
      label.text = labelY;
      label.textHorizontalAlignment = TextBlock.HORIZONTAL_ALIGNMENT_LEFT;
      label.color = "black";
      label.fontSize = 50;
      advancedTexture.addControl(label);
    });

    // yLabels
    yLabels.forEach((labelX, labelXIndex) => {
      const labelPlane = MeshBuilder.CreatePlane("plane", {
        width: 10,
        height: 10,
      });
      labelPlane.parent = ground;
      labelPlane.position = new Vector3(
        data.length + 1 + 4,
        0.2,
        -data[0].length / 2 + labelXIndex * 2
      );
      labelPlane.rotation = new Vector3(deg(90), deg(180), deg(0));
      const advancedTexture = AdvancedDynamicTexture.CreateForMesh(labelPlane);
      const label = new TextBlock();
      label.text = labelX;
      label.textHorizontalAlignment = TextBlock.HORIZONTAL_ALIGNMENT_RIGHT;
      label.color = "black";
      label.fontSize = 50;
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
