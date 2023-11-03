import React, { useState } from "react";

const TreeNode = ({ node, onAddChild, onDelete, onChange, path, level }) => {
  const handleAddChild = () => {
    onAddChild(path);
  };

  const handleDelete = () => {
    onDelete(path);
  };

  const indentation = Array(level * 40)
    .fill("\u00A0")
    .join("");

  // console.log(indentation, " indentation");
  return (
    <div className="node">
      <div className="node-content">
        {indentation}
        <input
          type="text"
          className="node-input"
          value={node.value}
          onChange={(e) => onChange(path, e.target.value)}
        />
      </div>
      <div className="node-buttons">
        <button className="node-button" onClick={handleAddChild}>
          Add Child
        </button>
        <button className="node-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
      {node.children.map((child, index) => (
        <TreeNode
          key={index}
          node={child}
          onAddChild={onAddChild}
          onDelete={onDelete}
          onChange={onChange}
          path={[...path, index]}
          level={level + 1}
        />
      ))}
    </div>
  );
};

const TreeManager = () => {
  const [tree, setTree] = useState({
    value: "",
    children: [],
  });

  const addNode = (path) => {
    setTree((prevTree) => {
      const updatedTree = { ...prevTree };
      let currentNode = updatedTree;
      for (const index of path) {
        currentNode = currentNode.children[index];
      }
      currentNode.children.push({
        value: "",
        children: [],
      });
      return updatedTree;
    });
  };

  const deleteNode = (path) => {
    setTree((prevTree) => {
      const updatedTree = { ...prevTree };
      if (path.length === 0) {
        updatedTree.value = "";
        updatedTree.children = [];
        return updatedTree;
      }
      let currentNode = updatedTree;
      for (let i = 0; i < path.length - 1; i++) {
        currentNode = currentNode.children[path[i]];
      }
      currentNode.children.splice(path[path.length - 1], 1);
      return updatedTree;
    });
  };

  const handleChange = (path, value) => {
    setTree((prevTree) => {
      const updatedTree = { ...prevTree };
      let currentNode = updatedTree;
      for (const index of path) {
        currentNode = currentNode.children[index];
      }
      currentNode.value = value;
      return updatedTree;
    });
  };

  return (
    <div>
      <button onClick={() => console.log(tree, " trrr")}>tree</button>
      <TreeNode
        node={tree}
        onAddChild={addNode}
        onDelete={deleteNode}
        onChange={handleChange}
        path={[]}
        level={0}
      />
    </div>
  );
};

export default TreeManager;
