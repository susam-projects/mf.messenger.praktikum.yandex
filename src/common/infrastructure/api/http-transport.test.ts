import xhrMock from "xhr-mock";
import HttpTransport from "./http-transport";
import cases from "jest-in-case";
import { Mock } from "xhr-mock/lib/types";

describe("HttpTransport", () => {
    type SendRequestCase = {
        name: string;
        prepare: (xhr: typeof xhrMock, url: string, mock: Mock) => unknown;
        request: (transport: HttpTransport, url: string) => ReturnType<typeof transport.get>;
    };

    cases<SendRequestCase>(
        "can send request",
        async ({ prepare, request }) => {
            xhrMock.setup();
            const transport = new HttpTransport();

            const TEST_STATUS = 201;
            const TEST_RESPONSE = '{"data":{"id":"abc-123"}}';

            prepare(xhrMock, "/api/user", (_, res) => {
                return res.status(TEST_STATUS).body(TEST_RESPONSE);
            });

            const response = await request(transport, "/api/user");
            expect(response.status).toEqual(TEST_STATUS);
            expect(response.response).toEqual(TEST_RESPONSE);

            xhrMock.teardown();
        },
        [
            {
                name: "GET",
                prepare: (xhr, url, mock) => xhr.get(url, mock),
                request: (transport, url) => transport.get(url),
            },
            {
                name: "POST",
                prepare: (xhr, url, mock) => xhr.post(url, mock),
                request: (transport, url) => transport.post(url),
            },
            {
                name: "PUT",
                prepare: (xhr, url, mock) => xhr.put(url, mock),
                request: (transport, url) => transport.put(url),
            },
            {
                name: "DELETE",
                prepare: (xhr, url, mock) => xhr.delete(url, mock),
                request: (transport, url) => transport.delete(url),
            },
        ],
    );

    type SendDataCase = {
        name: string;
        prepare: (xhr: typeof xhrMock, url: string, mock: Mock) => unknown;
        request: (transport: HttpTransport, url: string, data: object) => ReturnType<typeof transport.get>;
        isQuery?: boolean;
    };

    cases<SendDataCase>(
        "can send data in request",
        async ({ isQuery, request, prepare }) => {
            xhrMock.setup();
            const transport = new HttpTransport();

            const TEST_REQUEST_DATA = { key: "value", key2: 2 };
            const TEST_REQUEST_QUERY = "key=value&key2=2";

            if (isQuery) {
                prepare(xhrMock, `/api/user?${TEST_REQUEST_QUERY}`, (req, res) => {
                    expect(req.body()).toBeNull();
                    return res.status(200).body("{}");
                });
            } else {
                prepare(xhrMock, "/api/user", (req, res) => {
                    expect(req.header("Content-Type")).toContain("application/json");
                    expect(req.body()).toEqual(JSON.stringify(TEST_REQUEST_DATA));
                    return res.status(200).body("{}");
                });
            }

            await request(transport, "/api/user", TEST_REQUEST_DATA);

            xhrMock.teardown();
        },
        [
            {
                name: "GET",
                prepare: (xhr, url, mock) => xhr.get(url, mock),
                request: (transport, url, data) => transport.get(url, { data }),
                isQuery: true,
            },
            {
                name: "POST",
                prepare: (xhr, url, mock) => xhr.post(url, mock),
                request: (transport, url, data) => transport.post(url, { data }),
            },
            {
                name: "PUT",
                prepare: (xhr, url, mock) => xhr.put(url, mock),
                request: (transport, url, data) => transport.put(url, { data }),
            },
            {
                name: "DELETE",
                prepare: (xhr, url, mock) => xhr.delete(url, mock),
                request: (transport, url, data) => transport.delete(url, { data }),
            },
        ],
    );

    describe("can upload files", () => {
        const transport = new HttpTransport();

        beforeEach(() => {
            xhrMock.setup();
        });

        afterEach(() => {
            xhrMock.teardown();
        });

        it("can upload file as form data", async () => {
            const TEST_FILE = new File([], "test-file");

            function getFiles(form: FormData) {
                const files: File[] = [];
                for (let key of form.keys()) {
                    files.push(form.get(key) as File);
                }
                return files;
            }

            xhrMock.post("/upload", (req, res) => {
                expect(req.header("Content-Type")).toContain("multipart/form-data");
                expect(req.body()).toBeInstanceOf(FormData);
                expect(getFiles(req.body())).toContain(TEST_FILE);
                return res.status(200);
            });

            await transport.upload("/upload", { data: TEST_FILE });
        });
    });
});
