import numpy as np

class SIR:
    def __init__(self, beta, gamma, N):
        self.beta = beta
        self.gamma = gamma
        self.N = N
    
    def ds_dt(self, S, I, R):
        return -(self.beta * I * S) / self.N
    
    def di_dt(self, S, I, R):
        return (self.beta * I * S) / self.N - self.gamma * I
    
    def dr_dt(self, S, I, R):
        return self.gamma * I

class SIRS:
    def __init__(self, beta, gamma, tau, N):
        self.beta = beta
        self.gamma = gamma
        self.tau = tau
        self.N = N
    
    def ds_dt(self, S, I, R):
        return -(self.beta * I * S) / self.N + self.tau * R
    
    def di_dt(self, S, I, R):
        return (self.beta * I * S) / self.N - self.gamma * I
    
    def dr_dt(self, S, I, R):
        return self.gamma * I - self.tau * R

class SEIR:
    def __init__(self, beta, gamma, delta, N):
        self.beta = beta
        self.gamma = gamma
        self.delta = delta
        self.N = N
    
    def ds_dt(self, S, E, I, R):
        return -(self.beta * I * S) / self.N
    
    def de_dt(self, S, E, I, R):
        return (self.beta * I * S) / self.N - self.delta * E

    def di_dt(self, S, E, I, R):
        return self.delta * E - self.gamma * I
    
    def dr_dt(self, S, E, I, R):
        return self.gamma * I