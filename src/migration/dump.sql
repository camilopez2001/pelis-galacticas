--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8
-- Dumped by pg_dump version 15.1 (Debian 15.1-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying NOT NULL,
    password character varying,
    email character varying,
    access_token character varying
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."user" VALUES (4, 'Administrador', '$2b$10$XdkRWzZNUR.3rp/l6FWEZuElYZZxt3tym0Q9CFlYl7vgr4UXqPm9G', 'camilopez8501@gmail.com', 'eyJraWQiOiJSWFV3Zzg5dlZ3NHBZTW9ONFNxM0hjTGhZZjUyamRGdHVjeW5aREpRUE1vPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4ZTI0ZjQzZC1mNTcyLTRmNGMtOWU4Zi0wNTQ3YmMwNWIxNmMiLCJjb2duaXRvOmdyb3VwcyI6WyJBRE1JTklTVFJBRE9SIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl9FQTNqUVdMZ2giLCJjdXN0b206Z3JvdXAiOiJBRE1JTklTVFJBRE9SIiwiY29nbml0bzp1c2VybmFtZSI6ImFkbWluaXN0cmFkb3IiLCJvcmlnaW5fanRpIjoiM2MyM2JmMDktZTlkNS00Mzk3LTlmNTQtZjUyMDM2ZDhkZmJlIiwiYXVkIjoiMW9mbDF2MzM4bG1paHVwYnQ3ZDVpY25pYzAiLCJldmVudF9pZCI6IjA0NzBjZjNiLTIzMmItNDVmMS05OTYwLTI2NDE3MTkyZjY2YSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNzAxMTM0MDc5LCJleHAiOjE3MDExMzc2NzksImlhdCI6MTcwMTEzNDA3OSwianRpIjoiYzAxZjA1MGQtMzgyNy00YzZkLWJiYjYtNjA4NThjYTk0ZWM5IiwiZW1haWwiOiJjYW1pbG9wZXo4NTAxQGdtYWlsLmNvbSJ9.LZ5RJoJfpRikBBYbVhRY5wto_HmLqlSIn5yjQCbdrlaQxSyiCJLmtcZxSdNTOm57GGpcmILHZjhki5MqGPPKjm2nCa-MDUJ71lqFruwsik8cLLyWUw95ahjkKu-2VBpqoLpxEoYdLpbnHl10UtVmm4rHoonxezAzOaZHYFchQLNzxVFRVLsBw7epSOIep8zmWT6g08IgZe6OO6WJ0YD44JRfjv7sTgEJks5H2OYcjbOFMoA06Fi8Gz7XEzAnptZOjJXgCwufIv7wCbU99VnpkrhVjFkaDDsRUkGR7kO82uKiauLf4VK3bXeRtpuUY7IdftlGk7P6cu2iqXnsLCqH-g');


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 4, true);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user user_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_username_key UNIQUE (username);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

