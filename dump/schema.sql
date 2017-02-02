--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.0
-- Dumped by pg_dump version 9.6.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- Name: classes; Type: TYPE; Schema: public; Owner: efrei
--

CREATE TYPE classes AS ENUM (
    'warrior',
    'mage',
    'thief'
);


ALTER TYPE classes OWNER TO efrei;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: alliances; Type: TABLE; Schema: public; Owner: efrei
--

CREATE TABLE alliances (
    id integer NOT NULL,
    name character varying(40) NOT NULL
);


ALTER TABLE alliances OWNER TO efrei;

--
-- Name: alliances_id_seq; Type: SEQUENCE; Schema: public; Owner: efrei
--

CREATE SEQUENCE alliances_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE alliances_id_seq OWNER TO efrei;

--
-- Name: alliances_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: efrei
--

ALTER SEQUENCE alliances_id_seq OWNED BY alliances.id;


--
-- Name: characters; Type: TABLE; Schema: public; Owner: efrei
--

CREATE TABLE characters (
    id integer NOT NULL,
    name character varying(40) NOT NULL,
    user_id integer NOT NULL,
    class classes DEFAULT 'warrior'::classes NOT NULL,
    "position" point DEFAULT '(0,0)'::point NOT NULL
);


ALTER TABLE characters OWNER TO efrei;

--
-- Name: characters_id_seq; Type: SEQUENCE; Schema: public; Owner: efrei
--

CREATE SEQUENCE characters_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE characters_id_seq OWNER TO efrei;

--
-- Name: characters_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: efrei
--

ALTER SEQUENCE characters_id_seq OWNED BY characters.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: efrei
--

CREATE TABLE users (
    id integer NOT NULL,
    name character varying(40) NOT NULL,
    email character varying(40),
    alliance_id integer
);


ALTER TABLE users OWNER TO efrei;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: efrei
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO efrei;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: efrei
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: alliances id; Type: DEFAULT; Schema: public; Owner: efrei
--

ALTER TABLE ONLY alliances ALTER COLUMN id SET DEFAULT nextval('alliances_id_seq'::regclass);


--
-- Name: characters id; Type: DEFAULT; Schema: public; Owner: efrei
--

ALTER TABLE ONLY characters ALTER COLUMN id SET DEFAULT nextval('characters_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: efrei
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Name: alliances alliances_pkey; Type: CONSTRAINT; Schema: public; Owner: efrei
--

ALTER TABLE ONLY alliances
    ADD CONSTRAINT alliances_pkey PRIMARY KEY (id);


--
-- Name: characters characters_pkey; Type: CONSTRAINT; Schema: public; Owner: efrei
--

ALTER TABLE ONLY characters
    ADD CONSTRAINT characters_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: efrei
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: characters characters_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: efrei
--

ALTER TABLE ONLY characters
    ADD CONSTRAINT characters_users_id_fk FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: users users_alliances_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: efrei
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_alliances_id_fk FOREIGN KEY (alliance_id) REFERENCES alliances(id);


--
-- PostgreSQL database dump complete
--

