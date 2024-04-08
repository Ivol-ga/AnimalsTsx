import { FC } from "react";
import { requestAnimals, Animal} from "./api";

const Requirements: FC = (requestAnimals) => (
  <div>
    <h1>Задача: Реализация функциональности отображения списка животных</h1>
    <h2>Описание задачи:</h2>
    <ul>
      <li>
        Для выполнения данной задачи доступны две функции:{" "}
        <code>requestAnimals</code> и <code>requestAnimalsWithError</code>
      </li>
      <li>
        <code>requestAnimals</code> принимает аргумент типа <code>Query</code>,
        имитируя работу с API
      </li>
      <li>
        <code>requestAnimalsWithError</code> возвращает{" "}
        <code> {"Promise.reject<string>"}</code> с текстовой ошибкой
      </li>
    </ul>
    <h2>Требования:</h2>
    <ol>
      <li>
        Реализовать отображение списка животных с указанием их вида и количества
        через запятую.
      </li>
      <li>Показывать текст "Loading..." во время загрузки списка животных.</li>
      <li>
        Обрабатывать возможные ошибки при вызове <code>requestAnimals</code>{" "}
        (можно проверить с помощью <code>requestAnimalsWithError</code>) и
        отображать текст ошибки вместо списка животных.
      </li>
      <li>
        Реализовать фильтрацию по названию животного, передавая в аргументе поле{" "}
        <code>animal</code> в функции <code>requestAnimals</code> (например:{" "}
        <code>{'requestAnimals({animal: "Cat", ...})'}</code>). Значение по
        умолчанию - пустая строка.
      </li>
      <li>
        Реализовать фильтрацию по количеству (допустим, в зоопарке), передавая в
        аргументе поле <code>amount</code> в функции <code>requestAnimals</code>{" "}
        (например: <code>{'requestAnimals({amount: "26", ...})'}</code>).
        Значение по умолчанию - пустая строка.
      </li>
      <li>
        Реализовать возможность смены страницы и количества элементов на
        странице с помощью{" "}
        <code>{"requestAnimals({limit: 4, offset: 4, ...})"}</code>. Здесь{" "}
        <code>offset</code> представляет собой сдвиг (
        <code>offset = (page - 1) * limit</code>), Значения по умолчанию: offset
        - 0, limit - 4.
      </li>
      <li>
        При получении пустого списка от функции <code>requestAnimals</code>{" "}
        показывать сообщение <code> Animals not found</code>
      </li>
    </ol>

  </div>
)

export default Requirements;
