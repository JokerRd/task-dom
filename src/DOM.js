/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    for (let i = 0; i < count; i++) {
        const element = document.createElement(tag);
        element.insertAdjacentText('afterbegin', content);
        document.body.insertAdjacentElement('afterbegin', element);
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
    const rootDiv = document.createElement('div');
    rootDiv.classList.add('item_1');
    generateDiv(childrenCount, rootDiv, level - 1, 2);
    return rootDiv;
}

function generateDiv(childrenCount, currentElement, level, number) {
    if (level <= 0) {
        return;
    }
    for (let i = 0; i < childrenCount; i++) {
        const element = document.createElement('div');
        element.classList.add('item_' + number);
        currentElement.insertAdjacentElement('afterbegin', element);
        generateDiv(childrenCount, element, level - 1, number + 1);
    }
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    const div = generateTree(2, 3);
    let elements = div.getElementsByClassName('item_2');
    for (let node of elements) {
        const newElement = document.createElement('section');
        for (let attr of node.attributes) {
            newElement.setAttribute(attr.name, attr.value);
        }
        newElement.innerHTML = node.innerHTML;
        node.replaceWith(newElement);
    }
    return div;
}
