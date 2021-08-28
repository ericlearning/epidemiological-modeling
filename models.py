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