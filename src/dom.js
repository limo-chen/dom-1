window.dom = {
  create(string) {
    const container = document.createElement("template"); //自己创建一个
    container.innerHTML = string.trim(); //这个字符串就直接变成这个字符串的内容
    return container.content.firstChild; //必须这么写，返回div的第一个字符串
  },
  after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling); //新增弟弟
  },
  before(node, node2) {
    node.parentNode.insertBefore(node2, node); //新增哥哥
  },
  append(parent, node) {
    parent.appendChild(node); //新增儿子
  },
  //比如说有两个div，中间再加一个div可不可以,就是再加一个爸爸
  wrap(node, parent) {
    dom.before(node, parent); //先把新的节点放在这个节点前面
    dom.append(parent, node); //然后把div2放到div3的里面
  },
  remove(node) {
    node.parentNode.removeChild(node);
    return node;
  },
  empty(node) {
    const { childNodes } = node;
    const array = [];
    let x = node.firstChild;
    array.push(dom.remove(node.firstChild));
    x = node.firstChild;
  }, //给我一个节点，我把这个节点的儿子全部干掉,用for循环
  attr(node, name, value) {
    // 重载
    if (arguments.length === 3) {
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },
  text(node, string) {
    // 适配
    if (arguments.length === 2) {
      if ("innerText" in node) {
        node.innerText = string;
      } else {
        node.textContent = string;
      }
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    }
  },
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },
  style(node, name, value) {
    if (arguments.length === 3) {
      // dom.style(div, 'color', 'red')
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        // dom.style(div, 'color')
        return node.style[name];
      } else if (name instanceof Object) {
        // dom.style(div, {color: 'red'})
        const object = name;
        for (let key in object) {
          node.style[key] = object[key];
        }
      }
    }
  },
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className);
    },
  },
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  }, //如果有scope，我就在scope中调用querySelectorAll，如果没有就在document中调用
  parent(node) {
    return node.parentNode;
  },
  children(node) {
    return node.children;
  },
  siblings(node) {
    return Array.from(node.parentNode.children).filter((n) => n !== node);
  },
  next(node) {
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      x = x.nextSibling;
    }
    return x;
  },
  previous(node) {
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      x = x.previousSibling;
    }
    return x;
  },
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },
  index(node) {
    const list = dom.children(node.parentNode);
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i;
  },
};
