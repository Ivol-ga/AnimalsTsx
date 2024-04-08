import {
    useEffect,
    useState,
    useCallback,
    ChangeEvent,
    ReactNode,
    useRef,
  } from "react";
  import { requestAnimals, requestAnimalsWithError, Animal, Query } from "./api";
  import { useDebounce } from "./lib/useDebounce";
  import Pagination from "./Pagination";
  import { FiltersData, PaginationData } from "./types";
  import "./styles.css";
  
  import Requirements from "./Requirements";
  
  const initialFilterValues: FiltersData = {
    animal: "",
    amount: "",
  };
  const initialPaginationValues: PaginationData = {
    offset: 0,
    limit: 4,
  };
  
  export default function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState(initialFilterValues);
    const [pagination, setPagination] = useState(initialPaginationValues);
    const debouncedFilter = useDebounce(filter);
    const prevQueryRef = useRef<Query | null>(null);
  
    //функция для обработки каждого клика по инпуту
    const patchFormFromInput = useCallback(
      ({ target }: ChangeEvent<HTMLInputElement>) => {
        setFilter((prev) => ({
          ...prev,
          [target.name]: target.value,
        }));
        setPagination(initialPaginationValues);
      },
      []
    );
  
    const getAnimals = (): ReactNode => {
      if (isLoading || error) return;
      if (animals.length === 0)
        return <div style={{ marginTop: "16px" }}>Animals not found</div>;
      return animals.map((animal, index) => (
        <div key={animal.id} style={{ marginTop: index === 0 ? "16px" : "4px" }}>
          {animal.animal} {animal.amount}
        </div>
      ));
    };
  
    useEffect(() => {
      const request = async () => {
        setIsLoading(true);
        const query = { ...pagination, ...debouncedFilter };
        //to change prev request changes if new was called
        prevQueryRef.current = query;
        //запрос на животных
        try {
          const fetchedAnimals = await requestAnimals(query);
  
          //если совпадают-запрос не идет
          if (prevQueryRef.current !== query) return;
          setAnimals(fetchedAnimals);
        } catch (e) {
          if (prevQueryRef.current !== query) return;
          if (e) setError(((e as Record<string, string>) || {}).message);
        } finally {
          if (prevQueryRef.current !== query) return;
          setIsLoading(false);
        }
      };
  
      request();
    }, [pagination, debouncedFilter]);
  
    return (
      <>
        <div className="app">
          <input
            value={filter.animal}
            name="animal"
            className="animal"
            placeholder="Animal"
            onChange={patchFormFromInput}
          ></input>
          <input
            type="number"
            name="amount"
            value={filter.amount}
            className="amount"
            placeholder="Amount"
            onChange={patchFormFromInput}
          ></input>
  
          <Pagination value={pagination} setValue={setPagination} />
  
          {isLoading && <div style={{ marginTop: "16px" }}>Loading...</div>}
          {isLoading && error && <div style={{ marginTop: "16px" }}>{error}</div>}
          {getAnimals()}
        </div>
        <Requirements />
      </>
    );
  }